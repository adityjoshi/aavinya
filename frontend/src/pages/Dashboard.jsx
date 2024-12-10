import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { FaUserMd, FaUserAlt, FaUserNurse, FaBed, FaPills, FaBars, FaCalendarAlt } from "react-icons/fa";
=======
import { FaUserMd, FaHospital, FaBed, FaUserNurse } from "react-icons/fa";
>>>>>>> 25cd69d23be54a52b9b55a29bc41206ec64a8765
import { useNavigate } from "react-router-dom";
import { GetAuthHeader } from "../utils/Headers";

function Dashboard() {
  const [userType, setUserType] = useState(null);
<<<<<<< HEAD
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
=======
>>>>>>> 25cd69d23be54a52b9b55a29bc41206ec64a8765
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch("http://localhost:2426/userType", {
          method: "GET",
          headers: GetAuthHeader(),
        });

        if (response.ok) {
          const data = await response.json();
          setUserType(data.userType);
        } else {
          console.error("Failed to fetch user type");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserType();
  }, []);

<<<<<<< HEAD
  // Apply global styles
  useEffect(() => {
    const globalStyles = {
      margin: "0",
      padding: "0",
      boxSizing: "border-box",
    };
    const root = document.documentElement;
    Object.keys(globalStyles).forEach((key) => {
      root.style.setProperty(key, globalStyles[key]);
    });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={dashboardContainer}>
      <div
        style={{
          ...sidebarContainer,
          width: isSidebarOpen ? "270px" : "80px",
        }}
      >
        <div style={sidebarHeaderContainer}>
          <h2 style={isSidebarOpen ? sidebarHeader : sidebarHeaderCollapsed}>Admin Dashboard</h2>
          <FaBars style={toggleIcon} onClick={toggleSidebar} />
        </div>
        <nav style={sidebarNav}>
          <div style={navItem} onClick={() => navigate("/doctors")}>
            <FaUserMd style={navIcon} />
            {isSidebarOpen && <span>Doctors</span>}
          </div>
          <div style={navItem} onClick={() => navigate("/patients")}>
            <FaUserAlt style={navIcon} />
            {isSidebarOpen && <span>Patients</span>}
          </div>
          <div style={navItem} onClick={() => navigate("/employees")}>
            <FaUserNurse style={navIcon} />
            {isSidebarOpen && <span>Employees</span>}
          </div>
          <div style={navItem} onClick={() => navigate("/beds")}>
            <FaBed style={navIcon} />
            {isSidebarOpen && <span>Beds</span>}
          </div>
          <div style={navItem} onClick={() => navigate("/appointments")}>
            <FaCalendarAlt style={navIcon} />
            {isSidebarOpen && <span>Appointments</span>}
          </div>
        </nav>
      </div>
      <div style={mainContent}>
        <div style={gridContainer}>
          {/* Register Doctor Button */}
          <div
            style={{ ...cardStyle, ...cardHoverEffect }}
            onClick={() => navigate("/RegisterDoctor")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaUserMd size={48} style={iconStyle} />
            <span style={cardTextStyle}>Register Doctor</span>
          </div>

          {/* Register Hospital Button */}
          <div
            style={{ ...cardStyle, ...cardHoverEffect }}
            onClick={() => navigate("/RegisterHospital")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaBed size={48} style={iconStyle} />
            <span style={cardTextStyle}>Register Hospital</span>
          </div>

          {/* Add Beds Button */}
          <div
            style={{ ...cardStyle, ...cardHoverEffect }}
            onClick={() => navigate("/AddBed")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaBed size={48} style={iconStyle} />
            <span style={cardTextStyle}>Add Beds</span>
          </div>

          {/* Register Staff Button */}
          <div
            style={{ ...cardStyle, ...cardHoverEffect }}
            onClick={() => navigate("/RegisterStaff")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaUserNurse size={48} style={iconStyle} />
            <span style={cardTextStyle}>Register Staff</span>
          </div>
=======
  return (
    <div style={dashboardContainer}>
      <h1 style={headerStyle}>Dashboard</h1>
      <div style={gridContainer}>
        {/* Register Doctor Button */}
        <div style={cardStyle} onClick={() => navigate("/RegisterDoctor")}>
          <FaUserMd size={36} style={iconStyle} />
          <span style={cardTextStyle}>Register Doctor</span>
        </div>

        {/* Register Hospital Button */}
        <div style={cardStyle} onClick={() => navigate("/RegisterHospital")}>
          <FaHospital size={36} style={iconStyle} />
          <span style={cardTextStyle}>Register Hospital</span>
        </div>

        {/* Add Beds Button */}
        <div style={cardStyle} onClick={() => navigate("/AddBed")}>
          <FaBed size={36} style={iconStyle} />
          <span style={cardTextStyle}>Add Beds</span>
        </div>

        {/* Register Staff Button */}
        <div style={cardStyle} onClick={() => navigate("/RegisterStaff")}>
          <FaUserNurse size={36} style={iconStyle} />
          <span style={cardTextStyle}>Register Staff</span>
>>>>>>> 25cd69d23be54a52b9b55a29bc41206ec64a8765
        </div>
      </div>
    </div>
  );
}

// Styles
const dashboardContainer = {
<<<<<<< HEAD
  display: "flex",
  fontFamily: "Arial, sans-serif",
=======
  padding: "40px 20px",
  fontFamily: "Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
>>>>>>> 25cd69d23be54a52b9b55a29bc41206ec64a8765
  backgroundColor: "#f8f9fa",
  minHeight: "100vh",
};

<<<<<<< HEAD
const sidebarContainer = {
  backgroundColor: "#343a40",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  transition: "width 0.3s",
};

const sidebarHeaderContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const sidebarHeader = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
  color: "#17a2b8",
};

const sidebarHeaderCollapsed = {
  display: "none",
};

const toggleIcon = {
  fontSize: "20px",
  cursor: "pointer",
  color: "#fff",
};

const sidebarNav = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
};

const navItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s",
  fontSize: "16px",
};

navItem[":hover"] = {
  backgroundColor: "#495057",
};

const navIcon = {
  fontSize: "20px",
};

const mainContent = {
  flex: 1,
  padding: "20px",
=======
const headerStyle = {
  fontSize: "32px",
  marginBottom: "30px",
  color: "#333",
>>>>>>> 25cd69d23be54a52b9b55a29bc41206ec64a8765
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  width: "100%",
<<<<<<< HEAD
  maxWidth: "1000px",
  marginTop: "20px",
=======
  maxWidth: "800px",
>>>>>>> 25cd69d23be54a52b9b55a29bc41206ec64a8765
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#007bff",
  color: "white",
<<<<<<< HEAD
  borderRadius: "12px",
  padding: "30px",
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const cardHoverEffect = {
  boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
};

const iconStyle = {
  marginBottom: "15px",
  color: "#ffffff",
};

const cardTextStyle = {
  fontSize: "18px",
=======
  borderRadius: "8px",
  padding: "20px",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

cardStyle[":hover"] = {
  transform: "scale(1.05)",
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
};

const iconStyle = {
  marginBottom: "10px",
};

const cardTextStyle = {
  fontSize: "16px",
>>>>>>> 25cd69d23be54a52b9b55a29bc41206ec64a8765
  fontWeight: "bold",
  textAlign: "center",
};

export default Dashboard;
