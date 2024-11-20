package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/adityjoshi/aavinya/database" // Import your database package
	"github.com/adityjoshi/aavinya/utils"    // Utility functions like email notifications
	"gorm.io/gorm"
)

// CheckAppointmentsQueue monitors the Redis queues for all hospitals and departments
func CheckAppointmentsQueue() {
	// Monitor the Redis queues for all hospitals and departments
	departments := []string{"Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General"} // Add your departments here

	// Check appointment queues for each department in each region (North, South, etc.)
	regions := []string{"North", "South", "East", "West"}
	hospitalIDs := []string{"1", "2", "3"} // Example hospital IDs, modify as needed

	// Check for each hospital and department in each region
	for _, region := range regions {
		for _, department := range departments {
			for _, hospitalID := range hospitalIDs {
				// Start the process for each region, department, and hospital
				go monitorQueueForDepartment(region, hospitalID, department)
			}
		}
	}

	// Keep the function running (or use a wait group to control the flow of execution)
	select {}
}

// monitorQueueForDepartment checks the appointment queue for a specific department, hospital, and region
func monitorQueueForDepartment(region, hospitalID, department string) {
	redisKey := fmt.Sprintf("appointments:%s:%s:%s", region, hospitalID, department)

	for {
		result, err := database.RedisClient.LRange(context.Background(), redisKey, 0, -1).Result()
		if err != nil {
			log.Printf("Error fetching appointments from Redis queue: %v", err)
			continue
		}

		for _, item := range result {
			var appointment database.Appointment
			if err := json.Unmarshal([]byte(item), &appointment); err != nil {
				log.Printf("Error unmarshalling appointment data: %v", err)
				continue
			}

			// Check if the appointment is marked as "done" in the database
			if appointment.IsDone {
				continue // Skip the appointment if it is already done
			}

			// Process the appointment if it's not marked as done
			checkAndNotifyAppointment(region, hospitalID, department, appointment, redisKey)
		}

		time.Sleep(10 * time.Second)
	}
}

// checkAndNotifyAppointment processes the appointment and checks if it's close to being next in line
func checkAndNotifyAppointment(region, hospitalID, department string, appointment database.Appointment, redisKey string) {
	// Select the correct database based on the region
	var db *gorm.DB
	switch region {
	case "North":
		db = database.NorthDB
	case "South":
		db = database.SouthDB
	case "East":
		db = database.DB
	case "West":
		db = database.DB
	default:
		log.Printf("Unknown region: %v", region)
		return
	}

	// Count the number of appointments in the queue for the same department, hospital, and region
	count, err := database.RedisClient.LLen(context.Background(), redisKey).Result()
	if err != nil {
		log.Printf("Error counting appointments in Redis queue: %v", err)
		return
	}

	// Log the count of appointments to verify the queue length
	log.Printf("Number of appointments in the queue for %s:%s:%s: %d", region, hospitalID, department, count)

	// Get the position of the current patient in the queue
	position := count - 1 // 0-indexed, so the last item has the position `count-1`
	log.Printf("Position of the current patient in the queue: %d", position)

	// Notify the patient if their appointment is close (e.g., 10 people ahead)
	if position <= 2 {
		notifyPatientOfUpcomingAppointment(db, &appointment, region)
	}
}

// notifyPatientOfUpcomingAppointment sends an email notification to the patient
func notifyPatientOfUpcomingAppointment(db *gorm.DB, appointment *database.Appointment, region string) {
	// Skip notification if the appointment is marked as done
	if appointment.IsDone {
		return
	}

	// Redis key to track patient notifications
	redisNotificationKey := fmt.Sprintf("sent_notifications:%s", region)

	// Check if the patient has already been notified
	alreadyNotified, err := database.RedisClient.SIsMember(context.Background(), redisNotificationKey, appointment.PatientID).Result()
	if err != nil {
		log.Printf("Error checking Redis for patient notification status: %v", err)
		return
	}

	if alreadyNotified {
		log.Printf("Patient ID %d has already been notified, skipping email.", appointment.PatientID)
		return
	}

	// Fetch patient and doctor details
	var patient database.Patients
	if err := db.Where("patient_id = ?", appointment.PatientID).First(&patient).Error; err != nil {
		log.Printf("Error fetching patient details for PatientID %s: %v", appointment.PatientID, err)
		return
	}

	var doctor database.Doctors
	if err := db.Where("doctor_id = ?", appointment.DoctorID).First(&doctor).Error; err != nil {
		log.Printf("Error fetching doctor details for DoctorID %s: %v", appointment.DoctorID, err)
		return
	}

	// Send the email
	fmt.Printf("Sending email to patient %s: %s, with doctor %s: %s\n", patient.FullName, patient.Email, doctor.FullName, doctor.FullName)

	err = utils.SendAppointmentComingEmail(patient.Email, doctor.FullName, appointment.AppointmentDate.Format("2006-01-02"), appointment.AppointmentTime.Format("15:04"), "December")
	if err != nil {
		log.Printf("Error sending appointment email: %v", err)
		return
	}

	// Log that the email has been sent
	fmt.Printf("Patient %s, your appointment with Dr. %s is approaching!\n", patient.FullName, doctor.FullName)

	// Mark the appointment as "done" after sending the email
	appointment.IsDone = true

	// Save the updated appointment status in the database
	if err := db.Save(appointment).Error; err != nil {
		log.Printf("Error updating appointment status to done for PatientID %d: %v", appointment.PatientID, err)
	}

	// Add the patient ID to the Redis set to track that they have been notified
	if err := database.RedisClient.SAdd(context.Background(), redisNotificationKey, appointment.PatientID).Err(); err != nil {
		log.Printf("Error adding PatientID %d to Redis notification set: %v", appointment.PatientID, err)
	}
	// added the expiration
	if err := database.RedisClient.Expire(context.Background(), redisNotificationKey, 10*time.Minute).Err(); err != nil {
		log.Printf("Error setting expiration for Redis notification set: %v", err)
	}
}
