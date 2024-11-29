import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("north"); // Initialize region state
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
console.log(email);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, region }; // Include region in the request body
      console.log(body);

      const response = await fetch("http://localhost:2426/adminLogin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (data.message === "OTP sent to email. Please verify the OTP") {
        localStorage.setItem("jwtToken", data.jwtToken);
        window.location = "/loginotpverification";
      } else {
        alert("Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="a"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.6) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    strokeWidth="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
            </svg>
          </div>
          <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="b"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.5) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    strokeWidth="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#b)" />
            </svg>
          </div>
          {/* Register */}
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              {/* Logo */}
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a
                  href="#"
                  className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
                >
                  <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100">
                    Login.
                  </span>
                </a>
              </div>
              {/* /Logo */}
              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome!</h4>
              <p className="mb-6 text-gray-500">Please sign-in to access your account</p>
              <form className="mb-4" onSubmit={onSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email"
                    autoFocus=""
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type={showPassword ? "text" : "password"} 
                      id="password"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      placeholder="············"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword((prev) => !prev)} // Toggle showPassword state
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4.03-9-9 0-1.67.457-3.235 1.252-4.575m13.871-.014A10.045 10.045 0 0121 10c0 4.97-4.03 9-9 9-1.67 0-3.235-.457-4.575-1.252M15 12a3 3 0 01-6 0 3 3 0 016 0zm6.063 7.64L4.8 4.677M1 1l22 22"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 01-6 0 3 3 0 016 0zm9 0c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {/* Region Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="region"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Region
                  </label>
                  <select
                    id="region"
                    className="block w-full cursor-pointer appearance-none rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select>
                </div>
                {/* /Region Dropdown */}
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-indigo-600 px-7 py-3 text-sm font-medium uppercase text-white shadow-md hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-0 active:bg-indigo-800"
                >
                  Sign in
                </button>
              </form>
              <p className="mb-4 text-center">
                Don't have an account yet?
                <a
                  href="/signup"
                  className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
                >
                  {" "}
                  Create an account{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
