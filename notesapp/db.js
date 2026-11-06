const mongoose = require("mongoose");
const dns = require("node:dns");

require("dotenv").config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connection = mongoose.connect(process.env.mongourl);

module.exports = { connection };