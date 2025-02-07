import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animation
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

  const actionCards = [
    {
      image: "/images/doctor.jpg",
      label: "Register Doctor",
      description: "Add new doctors to your medical team effortlessly.",
      href: "/RegisterDoctor",
    },
    {
      image: "/images/hospital.jpg",
      label: "Register Hospital",
      description: "Manage and register hospitals within your network.",
      href: "/RegisterHospital",
    },
    {
      image: "/images/beds.jpg",
      label: "Add Beds",
      description: "Track and manage hospital bed availability in real-time.",
      href: "/AddBed",
    },
    {
      image: "/images/staff.jpg",
      label: "Register Staff",
      description: "Expand your team by adding qualified staff members.",
      href: "/RegisterStaff",
    },
  ];

  return (
    <main style={mainContent}>
      {/* Video Section */}
      {/* <section style={videoSection}>
        <video autoPlay muted loop style={videoStyle}>
          <source src="/videos/Medical Education video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section> */}

      {/* Action Cards Section */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
        {actionCards.map((card, index) => (
          <motion.div
            key={index}
            className="relative group rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 p-1 shadow-lg hover:shadow-2xl"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => navigate(card.href)}
          >
            <div className="h-full bg-white p-4 rounded-lg">
              <img
                src={card.image}
                alt={card.label}
                className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{card.label}</h2>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <div className="flex justify-between">
                {/* <span
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                  onClick={() => navigate(card.href)}
                >
                  Get Started
                </span> */}
                <span
                  className="px-4 py-2 text-blue-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => navigate(card.href)}
                >
                  View More
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}

// Styles
const mainContent = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
};

const videoSection = {
  position: "relative",
  width: "100%",
  height: "300px", // Adjust height as needed
  overflow: "hidden",
  marginBottom: "20px",
  borderRadius: "16px", // Add rounded corners
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add subtle shadow for depth
};

const videoStyle = {
  objectFit: "cover",
  width: "100%",
  height: "100%",
  borderRadius: "inherit", // Inherit the border radius from the parent
};


export default Dashboard;