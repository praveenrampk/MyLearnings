const express = require("express");
const cors = require("cors");
const userRoutes = require("./Routes/routes");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.listen(PORT, () => {
  console.log(`Server Running on the Port: http://localhost:${PORT}`);
});
