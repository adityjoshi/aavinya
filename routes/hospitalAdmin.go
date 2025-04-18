package routes

import (
	"time"

	"github.com/adityjoshi/aavinya/controllers"
	kafkamanager "github.com/adityjoshi/aavinya/kafka/kafkaManager"
	"github.com/adityjoshi/aavinya/middleware"
	"github.com/gin-gonic/gin"
)

func HospitalAdmin(incomingRoutes *gin.Engine, km *kafkamanager.KafkaManager) {

	adminRouting := incomingRoutes.Group("/hospitalAdmin")
	adminRouting.POST("/registerHospitalAdmin", func(c *gin.Context) {
		c.Set("km", km)
		controllers.RegisterHospitalAdmin(c)
	})
	adminRouting.POST("/adminLogin", middleware.RateLimiterMiddleware(2, time.Minute), controllers.AdminLogin)
	adminRouting.POST("/adminOtp", middleware.AuthRequired("Admin", ""), controllers.VerifyAdminOTP)
	adminRouting.Use(middleware.AuthRequired("Admin", ""))
	{

		adminRouting.POST("/AdminRegisteringHospital", middleware.AuthRequired("Admin", ""), func(c *gin.Context) {
			c.Set("km", km)
			controllers.RegisterHospital(c)
		})
		adminRouting.POST("/Registerdoctor", middleware.AuthRequired("Admin", ""), controllers.RegisterDoctor)
		adminRouting.GET("/getDoctorsAdmin", controllers.GetAllDoctorsDetailsAdmin)

		adminRouting.GET("/gethospital/:id", controllers.GetHospital)
		adminRouting.POST("/registerStaff", func(c *gin.Context) {
			c.Set("km", km)
			controllers.RegisterStaff(c)
		})
		adminRouting.POST("/registerBeds", middleware.AuthRequired("Admin", ""), controllers.AddBedType)
		adminRouting.POST("/updateBeds", middleware.AuthRequired("Admin", ""), controllers.UpdateTotalBeds)
		adminRouting.GET("/getBeds", controllers.GetTotalBeds)
		adminRouting.GET("/getdoctor/:id", middleware.OtpAuthRequireed, controllers.GetDoctor)
		adminRouting.POST("/createAppointment", func(c *gin.Context) {
			c.Set("km", km)
			controllers.CreateAppointment(c)
		})
		adminRouting.POST("/patientHospitaliseRequest", func(c *gin.Context) {
			c.Set("km", km)
			controllers.AdmitPatientForHospitalization(c)
		})

		adminRouting.POST("/patientRegistration", func(c *gin.Context) {
			c.Set("km", km)
			controllers.RegisterPatient(c)
		})
		incomingRoutes.POST("/markAppointment/:appointment_id", controllers.RemoveAppointmentFromQueue)
		incomingRoutes.GET("/getRooms", middleware.AuthRequired("Staff", "Compounder"), controllers.GetRoomAssignments)

	}

}
