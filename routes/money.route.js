const express = require("express");
const route = express.Router();
const moneyController = require("../controllers/money.controller");

route.get("/:userId", moneyController.getMoneyByUserId);
route.post("/", moneyController.postMoney);
module.exports = route;
