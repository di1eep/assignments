const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes.js");

const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://pd9505424580:2pOoySPF9yTWac3B@cluster0.uvnlyys.mongodb.net/MVC_Arch?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);


// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
