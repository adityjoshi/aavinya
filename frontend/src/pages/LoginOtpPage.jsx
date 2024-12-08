import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Retrieve the JWT and region from localStorage
  const jwtToken = localStorage.getItem("jwtToken");
  const region = localStorage.getItem("region");

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   // Ensure that both JWT token and region are available
  //   if (!jwtToken || !region) {
  //     alert("Missing authentication data. Please log in again.");
  //     navigate("/login");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const body = { email, otp };

  //     // Make the API request with Authorization header and region context
  //     const response = await fetch("http://localhost:2426/adminOtp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${jwtToken}`,
  //         "Region": region,
  //       },
  //       body: JSON.stringify(body),
  //     });

  //     if (response.status === 200 || response.status === 204) {
  //       navigate("/");
  //     } else {
  //       const data = await response.json();
  //       alert(data.error || "Invalid OTP. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Error during OTP verification:", err);
  //     alert("There was an error during OTP verification. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (!jwtToken || !region) {
      alert("Missing authentication data. Please log in again.");
      navigate("/login");
      return;
    }
  
    const isTokenExpired = (token) => {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the payload
        return decoded.exp * 1000 < Date.now(); // Compare expiry time with current time
      } catch (error) {
        return true; // Assume expired if decoding fails
      }
    };
  
    if (isTokenExpired(jwtToken)) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const body = { email, otp };
  
      const response = await fetch("http://localhost:2426/adminOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
          "Region": region,
        },
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        console.error("Server Response:", data);
        alert(data.error || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      alert("An error occurred while verifying OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="otp-container" style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif" }}>
      <h2 className="otp-title" style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Verify OTP</h2>
      <form onSubmit={onSubmit} className="otp-form">
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px", color: "#555" }}>Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            aria-label="Email"
            style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="otp" style={{ display: "block", marginBottom: "5px", color: "#555" }}>Enter OTP</label>
          <input
            id="otp"
            type="text"
            className="form-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            aria-label="OTP"
            style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting} style={{ width: "100%", padding: "10px", fontSize: "16px", color: "#fff", backgroundColor: "#007bff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {isSubmitting ? <span className="spinner"></span> : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default VerifyOtpPage;
