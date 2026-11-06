const express = require("express");
const cors = require("cors");

const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { auth } = require("./middlewere/auth.middlewere");
const { noteRouter } = require("./routes/note.route");

const app = express();

// CORS MUST BE BEFORE ALL ROUTES
app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("HOME Page");
});

app.use(auth);

app.use("/note", noteRouter);

app.get("/dashboard", (req, res) => {
  res.send("Private Route");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
  console.log("Server started");
});