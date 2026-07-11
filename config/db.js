require("dotenv").config();
const mongoose = require("mongoose");
const dns = require("dns");
const db_uri = process.env.MONGO_URI;
dns.setServers(["1.1.1.1", "8.8.8.8"]);

function connectDB() {
  mongoose
    .connect(db_uri)
    .then(() => console.log("MongoDB Connected Successfully."))
    .catch((err) => console.log("Error in DB Connection", err));
}

module.exports = connectDB;
