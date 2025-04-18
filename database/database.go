package database

import (
	"fmt"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	NorthDB *gorm.DB
	SouthDB *gorm.DB
	DB      *gorm.DB
)

func InitDatabase() {
	var err error
	dsn := "host=postgres-db user=postgres password=postgres dbname=hosp port=5432"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect to default database")
	} else {
		fmt.Println("Database connected successfully ⚡️")
	}

	Northdsn := "host=postgres-db-north user=postgres password=postgres dbname=northdb port=5432"
	NorthDB, err = gorm.Open(postgres.Open(Northdsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect to North database")
	} else {
		fmt.Println("North database connected successfully ⚡️")
	}

	Southdsn := "host=postgres-db-south user=postgres password=postgres dbname=southdb port=5432"
	SouthDB, err = gorm.Open(postgres.Open(Southdsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect to South database")
	} else {
		fmt.Println("South database connected successfully ⚡️")
	}

	DB.AutoMigrate(&Users{}, &PatientInfo{}, &HospitalAdmin{}, &Hospitals{}, &Doctors{}, &Appointment{}, &HospitalStaff{}, &BedsCount{}, &Patients{}, &Room{}, &PatientBeds{})
	NorthDB.AutoMigrate(&Users{}, &PatientInfo{}, &HospitalAdmin{}, &Hospitals{}, &Doctors{}, &Appointment{}, &HospitalStaff{}, &BedsCount{}, &Patients{}, &Room{}, &PatientBeds{})
	SouthDB.AutoMigrate(&Users{}, &PatientInfo{}, &HospitalAdmin{}, &Hospitals{}, &Doctors{}, &Appointment{}, &HospitalStaff{}, &BedsCount{}, &Patients{}, &Room{}, &PatientBeds{})
}

type Gender string

const (
	Male   Gender = "Male"
	Female Gender = "Female"
)

type UserType string

const (
	Staff   UserType = "Staff"
	Patient UserType = "Patient"
	Admin   UserType = "Admin"
)

type Users struct {
	User_id       uint     `gorm:"primaryKey"`
	Full_Name     string   `json:"Full_Name" gorm:"not null"`
	GenderInfo    Gender   `json:"GenderInfo"`
	ContactNumber string   `json:"ContactNumber" gorm:"not null"`
	Email         string   `json:"Email" gorm:"not null;unique"`
	Password      string   `json:"Password"`
	Region        string   `json:"region"`
	User_type     UserType `json:"User_type"`
}

type PatientInfo struct {
	Username  string `gorm:"not null"`
	City      string
	State     string
	PinCode   uint
	Adhar     string
	PatientID uint `gorm:"primaryKey;foreignKey:PatientID;references:Users(User_id);onDelete:CASCADE"`
}

type Patients struct {
	PatientID     uint   `json:"patient_id" gorm:"primaryKey;autoIncrement"`
	FullName      string `json:"full_name" gorm:"not null"`
	ContactNumber string `json:"contact_number" gorm:"not null"`
	Email         string `json:"email" gorm:"not null;unique"`
	Address       string `json:"address"`
	City          string `json:"city"`
	State         string `json:"state"`
	PinCode       string `json:"pin_code"`
	Gender        string `json:"gender"`
	Adhar         string `json:"adhar"`
	HospitalID    uint   `json:"hospital_id" gorm:"not null;foreignKey:HospitalID;references:Hospitals(HospitalId)"`
	Region        string `json:"region"`
}

type HospitalAdmin struct {
	AdminID       uint     `gorm:"primaryKey;autoIncrement"`
	FullName      string   `gorm:"not null" json:"full_name"`
	Email         string   `gorm:"unique;not null" json:"email"`
	Password      string   `gorm:"not null" json:"password"`
	ContactNumber string   `gorm:"not null" json:"contact_number"`
	Region        string   `json:"region"`
	Usertype      UserType `json:"user_type" gorm:"not null"`
}

type Position string

const (
	Billing    Position = "Billing"
	Compounder Position = "Compounder"
	Reception  Position = "Reception"
)

type Hospitals struct {
	HospitalId    uint   `json:"hospital_id" gorm:"primaryKey;autoIncrement"`
	HospitalName  string `json:"hospital_name" gorm:"not null"`
	Address       string `json:"address" gorm:"not null"`
	City          string `json:"city" gorm:"not null"`
	State         string `json:"state" gorm:"not null"`
	PinCode       string `json:"pincode" gorm:"not null"`
	ContactNumber string `json:"contact_number" gorm:"not null"`
	Email         string `json:"email" gorm:"not null"`
	AdminID       uint   `json:"admin_id" gorm:"primaryKey;foreignKey:AdminID;references:HospitalAdmin(AdminID);onDelete:CASCADE"`
	Username      string `json:"username" gorm:"unique;not null"`
	Description   string `json:"description"`
	Region        string `json:"region"`
}

type Department string

const (
	Cardiology  Department = "Cardiology"
	Neurology   Department = "Neurology"
	Orthopedics Department = "Orthopedics"
	Pediatrics  Department = "Pediatrics"
	Radiology   Department = "Radiology"
	Surgery     Department = "Surgery"
	InternalMed Department = "Internal Medicine"
)

type Doctors struct {
	DoctorID      uint       `json:"doctor_id" gorm:"primaryKey;autoIncrement"`
	FullName      string     `json:"full_name" gorm:"not null"`
	Description   string     `json:"description" gorm:"not null"`
	ContactNumber string     `json:"contact_number" gorm:"not null"`
	Email         string     `json:"email" gorm:"unique;not null"`
	HospitalID    uint       `json:"hospital_id" gorm:"not null;foreignKey:HospitalID;references:Hospitals(HospitalId)"`
	Hospital      string     `json:"hospital_name" gorm:"not null;foreignKey:Hospital;references:Hospitals(HospitalName);onDelete:CASCADE"`
	Department    Department `json:"department" gorm:"not null"`
	Username      string     `json:"username" gorm:"unique;not null"`
	Region        string     `json:"region"`
	Password      string     `json:"-"` //`json:"password" `
}

type HospitalStaff struct {
	StaffID       uint     `json:"staff_id" gorm:"primaryKey;autoIncrement"`
	FullName      string   `json:"full_name" gorm:"not null"`
	Email         string   `json:"email" gorm:"unique;not null"`
	ContactNumber string   `json:"contact_number" gorm:"not null"`
	Position      Position `json:"position" gorm:"not null"` // Enum-like field
	HospitalID    uint     `json:"hospital_id" gorm:"not null;foreignKey:HospitalID;references:Hospitals(HospitalId)"`
	HospitalName  string   `gorm:"not null "`
	Username      string   `json:"username" gorm:"unique;not null"`
	Password      string   `json:"password" gorm:"not null"`
	Region        string   `json:"region"`
}
type BedsType string

const (
	ICU         BedsType = "ICU"
	GeneralWard BedsType = "GeneralWard"
)

type BedsCount struct {
	ID         uint     `json:"id" gorm:"primaryKey;autoIncrement"`
	TypeName   BedsType `json:"type_name" gorm:"not null;unique"` // e.g., ICU, General Ward
	TotalBeds  uint     `json:"total_beds" gorm:"not null"`       // Total beds defined by the admin
	HospitalID uint     `json:"hospital_id" gorm:"not null;foreignKey:HospitalID;references:Hospitals(HospitalId)"`
	IsOccupied bool     `json:"is_occupied" gorm:"default:false"`
	Region     string   `json:"region"`
}
type Room struct {
	ID         uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	HospitalID uint   `json:"hospital_id" gorm:"not null;index"`  // Hospital ID reference
	BedType    string `json:"bed_type" gorm:"not null;index"`     // e.g., ICU, General Ward
	RoomNumber string `json:"room_number" gorm:"not null;unique"` // Room number (e.g., icu1, icu2)
	IsOccupied bool   `json:"is_occupied" gorm:"default:false"`   // Track if the room is occupied
}

type PatientBeds struct {
	PatientID        uint     `json:"patient_id" gorm:"primaryKey;autoIncrement"`
	FullName         string   `json:"full_name" gorm:"not null"`
	ContactNumber    string   `json:"contact_number" gorm:"not null"`
	Email            string   `json:"email" gorm:"not null;unique"`
	Address          string   `json:"address"`
	City             string   `json:"city"`
	State            string   `json:"state"`
	PinCode          string   `json:"pin_code"`
	Gender           string   `json:"gender"`
	Adhar            string   `json:"adhar"`
	HospitalID       uint     `json:"hospital_id" gorm:"not null;foreignKey:HospitalID;references:Hospitals(HospitalId)"`
	HospitalName     string   `json:"hospital_name" gorm:"not null"`     // Stores the hospital name
	HospitalUsername string   `json:"hospital_username" gorm:"not null"` // Stores hospital username
	DoctorName       string   `json:"doctor_name" gorm:"not null"`       // Doctor responsible for the patient
	Hospitalized     bool     `json:"hospitalized" gorm:"default:false"` // Indicates if the patient is hospitalized
	PaymentFlag      bool     `json:"payment_flag" gorm:"default:false"` // Indicates if payment is cleared
	PatientBedType   BedsType `json:"patient_bed_type" gorm:"not null"`
	PatientRoomNo    string   `json:"patient_room_no" gorm:"not null"`
}

type Appointment struct {
	AppointmentID   uint      `json:"appointment_id" gorm:"primaryKey;autoIncrement"`
	PatientID       uint      `json:"patient_id" gorm:"not null;foreignKey:PatientID;references:PatientInfo(PatientID);onDelete:CASCADE"`
	DoctorID        uint      `json:"doctor_id" gorm:"not null;foreignKey:DoctorID;references:Doctors(DoctorID);onDelete:CASCADE"`
	AppointmentDate time.Time `json:"appointment_date" gorm:"not null"`
	AppointmentTime time.Time `json:"appointment_time" gorm:"not null"`
	Description     string    `json:"description"`
	IsDone          bool      `json:"is_done"`
	Appointed       bool      `json:"appointed"`
}

func CloseDatabase() {
	if DB != nil {
		sqlDB, err := DB.DB()
		if err != nil {
			return
		}
		sqlDB.Close()
	}
	if NorthDB != nil {
		sqlDB, err := NorthDB.DB()
		if err != nil {
			return
		}
		sqlDB.Close()
	}
	if SouthDB != nil {
		sqlDB, err := SouthDB.DB()
		if err != nil {
			return
		}
		sqlDB.Close()
	}
}

func GetDBForRegion(region string) (*gorm.DB, error) {
	var db *gorm.DB
	switch region {
	case "north":
		db = NorthDB
	case "south":
		db = SouthDB

	default:
		return nil, fmt.Errorf("invalid region: %s", region)
	}
	return db, nil
}
