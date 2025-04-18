package main

import (
	"log"
	"net/http"

	"github.com/adityjoshi/aavinya/consumer"
	"github.com/adityjoshi/aavinya/controllers"
	"github.com/adityjoshi/aavinya/database"
	kafkamanager "github.com/adityjoshi/aavinya/kafka/kafkaManager"
	"github.com/adityjoshi/aavinya/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

var km *kafkamanager.KafkaManager

func main() {

	database.InitDatabase()
	defer database.CloseDatabase()
	database.InitializeRedisClient()

	northBrokers := []string{"kafka:9092"}
	southBrokers := []string{"kafka:9092"}

	var err error
	km, err = kafkamanager.NewKafkaManager(northBrokers, southBrokers)
	if err != nil {
		log.Fatal("Failed to initialize Kafka Manager:", err)
	}

	regions := []string{"north", "south"}
	for _, region := range regions {
		go func(r string) {
			log.Printf("Starting Kafka consumer for region: %s\n", r)
			consumer.StartConsumer(r)
		}(region)
	}

	go controllers.SubscribeToPaymentUpdates()
	go controllers.SubscribeToHospitalizationUpdates()
	go controllers.SubscribeToHospitaliztionUpdates()
	go controllers.SubscribeToAppointmentUpdates()
	go controllers.CheckAppointmentsQueue()
	go controllers.SubscribeToAppointmentUpdates()
	go controllers.StartPatientCountSubscriber()

	router := gin.Default()
	router.Use(setupCORS())
	setupSessions(router)
	setupRoutes(router)

	server := &http.Server{
		Addr:    ":2426",
		Handler: router,
	}
	log.Println("Server is running at :2426...")

	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
	select {}
}

func setupCORS() gin.HandlerFunc {
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{
		"http://localhost:5173",
	}
	config.AllowHeaders = []string{"Authorization", "Content-Type", "credentials", "region"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = append(config.AllowHeaders, "Authorization", "Content-Type", "credentials", "region")
	config.AllowCredentials = true
	return cors.New(config)
}

func setupSessions(router *gin.Engine) {
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("session", store))
}

func setupRoutes(router *gin.Engine) {
	routes.UserRoutes(router)
	routes.UserInfoRoutes(router)
	routes.HospitalAdmin(router, km)
	routes.StaffRoutes(router, km)
	routes.DoctorRoutes(router)
}
