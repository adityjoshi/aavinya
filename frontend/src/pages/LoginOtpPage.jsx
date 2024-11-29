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

  const onSubmit = async (e) => {
    e.preventDefault();

    // Ensure that both JWT token and region are available
    if (!jwtToken || !region) {
      alert("Missing authentication data. Please log in again.");
      navigate("/login");  // Redirect to login if JWT or region are not found
      return;
    }

    setIsSubmitting(true);

    try {
      const body = { email, otp };

      // Make the API request with Authorization header and region context
      const response = await fetch("http://localhost:2426/adminOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": ` ${jwtToken}`,  // Set Authorization header
          "Region": region,  // Set the region header (sent as context)
        },
        body: JSON.stringify(body),
      });

      // Check if the response status is 200 or 204
      if (response.status === 200 || response.status === 204) {
        // If the status is 200 or 204, navigate to the home page (or another page)
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.error || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      alert("There was an error during OTP verification. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify OTP</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label>Enter OTP sent to your email</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default VerifyOtpPage;
