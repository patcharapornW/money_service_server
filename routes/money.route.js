const express = require("express");
const moneyController = require("../controllers/money.controller");
const route = express.Router();

route.post('/', moneyController.postMoney);
route.get("/:userId", moneyController.getMoneyByUser);
module.exports = route;