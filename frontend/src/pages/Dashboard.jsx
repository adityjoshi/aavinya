// import Navbar from "./Navbar";
// import Complaint from "./Complaint";
// import WardenComplaints from "./WardenComplaint";

// function Dashboard() {
//     return (
//         <>
//          <Navbar/>
//          <Complaint/>
//          <WardenComplaints/>
//         </>
//     )
// }
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Complaint from "./Complaint";
import WardenComplaints from "./WardenComplaint";
import { GetAuthHeader } from "../utils/Headers";
import { Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  const [userType, setUserType] = useState(null);

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
    <>
      <div className="flex flex-col h-screen">
        <div className="w-full bg-gray-900">
          <Navbar />
        </div>
        <div className="flex flex-1 top-10">
          <div className="w-64">
            <Sidebar />
          </div>
          <div className="flex-1 p-4">
            {userType === "student" ? <Complaint /> : null}
            {userType === "warden" ? <WardenComplaints /> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
