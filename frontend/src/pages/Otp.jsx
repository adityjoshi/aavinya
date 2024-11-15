import { useState } from "react";

function OTPLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        // If no token is found, redirect to the login page
        window.location = "/login";
        return;
      }

      const body = { email, otp }; // Include email and OTP in the request payload

      const response = await fetch("http://localhost:2426/adminOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`, // Add the JWT token to the Authorization header
        },
        credentials: "include", // Ensure cookies are sent if needed
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        // If OTP verification is successful, redirect to the homepage or dashboard
        window.location = "/"; // Redirect to the homepage or dashboard
      } else {
        alert("Invalid OTP. Please check your email and try again.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          {/* SVG Patterns for Design */}
          <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
            {/* SVG Code */}
          </div>
          <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
            {/* SVG Code */}
          </div>

          {/* OTP Login Form */}
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex items-center justify-center">
                <a href="#" className="flex items-center gap-2 text-indigo-500">
                  <span className="text-3xl font-black tracking-tight">OTP Login</span>
                </a>
              </div>
              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome Back!</h4>
              <p className="mb-6 text-gray-500">Please enter your email and OTP to sign in</p>
              <form className="mb-4" onSubmit={onSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="mb-2 text-xs font-medium text-gray-700">Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:shadow"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="otp" className="mb-2 text-xs font-medium text-gray-700">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter your OTP"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:shadow"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <button
                    className="grid w-full rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-sm text-white shadow hover:bg-indigo-600"
                    type="submit"
                  >
                    Verify OTP
                  </button>
                </div>
              </form>
              <p className="mb-4 text-center">
                Don't have an account yet?
                <a href="/signup" className="text-indigo-500 hover:text-indigo-500"> Create an account</a>
              </p>
            </div>
          </div>
          {/* /OTP Login Form */}
        </div>
      </div>
    </>
  );
}

export default OTPLogin;
