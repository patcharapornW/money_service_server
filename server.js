const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const moneyRoute = require("./routes/money.route");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/money", moneyRoute);
app.use("/images/users", express.static("images/users"));
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
