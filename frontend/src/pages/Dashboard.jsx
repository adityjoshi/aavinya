import React, { useState, useEffect } from "react";
import { FaUserMd, FaHospital, FaBed, FaUserNurse } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GetAuthHeader } from "../utils/Headers";

function Dashboard() {
  const [userType, setUserType] = useState(null);
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
        </div>
      </div>
    </div>
  );
}

// Styles
const dashboardContainer = {
  padding: "40px 20px",
  fontFamily: "Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f8f9fa",
  minHeight: "100vh",
};

const headerStyle = {
  fontSize: "32px",
  marginBottom: "30px",
  color: "#333",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  width: "100%",
  maxWidth: "800px",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#007bff",
  color: "white",
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
  fontWeight: "bold",
  textAlign: "center",
};

export default Dashboard;
