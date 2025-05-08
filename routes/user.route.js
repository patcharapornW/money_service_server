const express = require('express');
const userController = require('../controllers/users.controller');
const route = express.Router();


//? การกำหนดวิธีการเรียกใช้ API (กำหนด end-point)
//? เพิ่ม ใช้post
route.post('/', userController.uploadUser, userController.userRegister);
//? ค้นหา ตรวจสอบ ดึง ดู ใช้ get
route.get('/:userName/:userPassword', userController.userLogin);
module.exports = route;