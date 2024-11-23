const express = require("express");
const cors = require("cors"); // Import the CORS package

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow only requests from frontend running on port 3000
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"], // Allowed headers
};

app.use(cors(corsOptions)); // Enable CORS for the entire app

// Middleware for parsing JSON bodies
app.use(express.json());

// Define routes
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));

// Start the server
app.listen(5000, () => {
  console.log("Backend listening on port 5000");
});
