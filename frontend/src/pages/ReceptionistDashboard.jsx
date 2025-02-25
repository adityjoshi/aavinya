import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./layout/header"; // Import Header

function ReceptionistDashboard() {
  const navigate = useNavigate();

  const actionCards = [
    {
      image: "/images/patient.jpg",
      label: "Patient Registration",
      description: "Register new patients quickly and efficiently.",
      href: "/patientRegistration",
    },
    {
      image: "/images/patient.jpg",
      label: "Patient Hospitalise",
      description: "Manage patient admissions and hospitalisation details.",
      href: "/patientHospitalise",
    },
    {
      image: "/images/doctor.jpg",
      label: "Doctor Details",
      description: "Get doctor details effortlessly.",
      href: "/doctors",
    },
  ];

  return (
    <div>
      <Header /> {/* Place Header at the top */}
      <div className="p-6 flex flex-col mt-16"> {/* Adjust margin-top to avoid overlap */}
        <h1 className="text-2xl font-bold text-gray-800">RECEPTIONIST DASHBOARD</h1>

        {/* Action Cards Section */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {actionCards.map((card, index) => (
            <motion.div
              key={index}
              className="relative group rounded-lg bg-gradient-to-r from-green-400 to-green-600 p-1 shadow-lg hover:shadow-2xl cursor-pointer"
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
                  <span className="px-4 py-2 text-green-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    View More
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default ReceptionistDashboard;
