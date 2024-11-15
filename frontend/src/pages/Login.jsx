// import { useState } from "react";

// function Login() {
//   const [ email, setEmail ] = useState("")
//   const [ password, setPassword ] = useState("")

//   const onSubmit = async(e) => {
//     e.preventDefault();

//     try {
//         const body = { email, password}
//         const response = await fetch("http://localhost:2426/adminLogin/", {
//             method: "POST",
//             headers: {"content-type": "application/json"},
//             body : JSON.stringify(body),
//         });
//         console.log(response)
//         const data = await response.json();
//         console.log(data);
       
//         if(data.jwtToken) {
//           localStorage.setItem("jwtToken", data.jwtToken);
//        window.location = "/"
//        }else {
//         alert("Invalid credentials. Please check your email and password.");
    
//       }
//     }catch(err) {
//         console.log(err.message);
//     }
//   }

//   return (
//     <>
// <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
//       <div className="relative">
//         <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
//           <svg
//             id="patternId"
//             width="100%"
//             height="100%"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <pattern
//                 id="a"
//                 patternUnits="userSpaceOnUse"
//                 width="40"
//                 height="40"
//                 patternTransform="scale(0.6) rotate(0)"
//               >
//                 <rect x="0" y="0" width="100%" height="100%" fill="none" />
//                 <path
//                   d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
//                   strokeWidth="1"
//                   stroke="none"
//                   fill="currentColor"
//                 />
//               </pattern>
//             </defs>
//             <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
//           </svg>
//         </div>
//         <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
//           <svg
//             id="patternId"
//             width="100%"
//             height="100%"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <pattern
//                 id="b"
//                 patternUnits="userSpaceOnUse"
//                 width="40"
//                 height="40"
//                 patternTransform="scale(0.5) rotate(0)"
//               >
//                 <rect x="0" y="0" width="100%" height="100%" fill="none" />
//                 <path
//                   d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
//                   strokeWidth="1"
//                   stroke="none"
//                   fill="currentColor"
//                 />
//               </pattern>
//             </defs>
//             <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#b)" />
//           </svg>
//         </div>
//         {/* Register */}
//         <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
//           <div className="flex-auto p-6">
//             {/* Logo */}
//             <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
//               <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
//                 <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">Login.</span>
//               </a>
//             </div>
//             {/* /Logo */}
//             <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome!</h4>
//             <p className="mb-6 text-gray-500">Please sign-in to access your account</p>
//             <form  className="mb-4" onSubmit={onSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email </label>
//                 <input
//                   type="text"
//                   className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
//                   id="email"
//                   name="email-username"
//                   placeholder="Enter your email"
//                   autoFocus=""
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="mb-4">
//                 <div className="flex justify-between">
//                   <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Password</label>
                  
//                 </div>
//                 <div className="relative flex w-full flex-wrap items-stretch">
//                   <input
//                     type="password"
//                     id="password"
//                     className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
//                     name="password"
//                     placeholder="············"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//               </div>
             
//               <div className="mb-4">
//                 <button
//                   className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
//                   type="submit"
//                 >
//                   Sign in
//                 </button>
//               </div>
//             </form>
//             <p className="mb-4 text-center">
//             Don't have an account yet?
//               <a href="/signup" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"> Create an account </a>
//             </p>
//           </div>
//         </div>
//         {/* /Register */}
//       </div>
//     </div>

//     </>
//   );
// }

// export default Login;



// import { useState } from "react";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [region, setRegion] = useState("north"); // Default value to "north"

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const body = { email, password, region }; // Include the region in the request payload
//       const response = await fetch("http://localhost:2426/adminLogin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: 'include',
//         body: JSON.stringify(body),
//       });
      
    

//       console.log(response);
//       const data = await response.json();
//       console.log(data);

//       if (data.jwtToken) {
//         localStorage.setItem("jwtToken", data.jwtToken);
//         window.location = "/";
//       } else {
//         alert("Invalid credentials. Please check your email, password, and region.");
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   return (
//     <>
//       <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50">
//         <div className="relative">
//           {/* SVG Patterns for Design */}
//           <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
//             {/* SVG Code */}
//           </div>
//           <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
//             {/* SVG Code */}
//           </div>

//           {/* Login Form */}
//           <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
//             <div className="flex-auto p-6">
//               <div className="mb-10 flex items-center justify-center">
//                 <a href="#" className="flex items-center gap-2 text-indigo-500">
//                   <span className="text-3xl font-black tracking-tight">Login.</span>
//                 </a>
//               </div>
//               <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome!</h4>
//               <p className="mb-6 text-gray-500">Please sign-in to access your account</p>
//               <form className="mb-4" onSubmit={onSubmit}>
//                 <div className="mb-4">
//                   <label htmlFor="email" className="mb-2 text-xs font-medium text-gray-700">Email</label>
//                   <input
//                     type="text"
//                     id="email"
//                     placeholder="Enter your email"
//                     className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:shadow"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="password" className="mb-2 text-xs font-medium text-gray-700">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     placeholder="Enter your password"
//                     className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:shadow"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="region" className="mb-2 text-xs font-medium text-gray-700">Region</label>
//                   <select
//                     id="region"
//                     className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:shadow"
//                     onChange={(e) => setRegion(e.target.value)}
//                     value={region} // Default region
//                   >
//                     <option value="north">North</option>
//                     <option value="south">South</option>
//                     <option value="east">East</option>
//                     <option value="west">West</option>
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <button
//                     className="grid w-full rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-sm text-white shadow hover:bg-indigo-600"
//                     type="submit"
//                   >
//                     Sign in
//                   </button>
//                 </div>
//               </form>
//               <p className="mb-4 text-center">
//                 Don't have an account yet?
//                 <a href="/signup" className="text-indigo-500 hover:text-indigo-500"> Create an account</a>
//               </p>
//             </div>
//           </div>
//           {/* /Login Form */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;


import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("north"); // Default value to "north"

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, region }; // Include the region in the request payload
      const response = await fetch("http://localhost:2426/adminLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);

      if (data.token) {
        // Store the JWT token if authentication is successful
        localStorage.setItem("jwtToken", data.token);
        
        // Redirect to the OTP verification page
        window.location = "/otp"; // Redirect to the OTP page for further verification
      } else {
        alert("Invalid credentials. Please check your email, password, and region.");
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

          {/* Login Form */}
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex items-center justify-center">
                <a href="#" className="flex items-center gap-2 text-indigo-500">
                  <span className="text-3xl font-black tracking-tight">Login.</span>
                </a>
              </div>
              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome!</h4>
              <p className="mb-6 text-gray-500">Please sign-in to access your account</p>
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
                  <label htmlFor="password" className="mb-2 text-xs font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:shadow"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="region" className="mb-2 text-xs font-medium text-gray-700">Region</label>
                  <select
                    id="region"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:shadow"
                    onChange={(e) => setRegion(e.target.value)}
                    value={region} // Default region
                  >
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select>
                </div>
                <div className="mb-4">
                  <button
                    className="grid w-full rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-sm text-white shadow hover:bg-indigo-600"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className="mb-4 text-center">
                Don't have an account yet?
                <a href="/signup" className="text-indigo-500 hover:text-indigo-500"> Create an account</a>
              </p>
            </div>
          </div>
          {/* /Login Form */}
        </div>
      </div>
    </>
  );
}

export default Login;
