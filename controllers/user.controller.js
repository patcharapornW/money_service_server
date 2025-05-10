//? จัดการ DB
const { PrismaClient } = require("@prisma/client");

//? จัดการการ Upload
const multer = require("multer");
const path = require("path");
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/users");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "user_" +
        Math.floor(Math.random() * Date.now()) +
        path.extname(file.originalname)
    );
  },
});

exports.uploadUser = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Error: Images Only");
  },
}).single("userImage");

exports.userRegister = async (req, res) => {
  try {
    const { userFullname, userBirthDate, userName, userPassword } = req.body;
    const result = await prisma.user_tb.create({
      data: {
        userFullname: userFullname,
        userBirthDate: userBirthDate,
        userName: userName,
        userPassword: userPassword,
        userImage: req.file ? req.file.path.replace("images\\users\\", "") : "",
      },
    });
    res.status(201).json({
      message: "User created successfully",
      info: result,
    });
  } catch (err) {
    res.status(500).json({
      error: `Server Error: ${err}`,
    });
    console.log(err);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { userName, userPassword } = req.params;

    const result = await prisma.user_tb.findFirst({
      where: {
        userName: userName,
        userPassword: userPassword,
      },
    });

    if (result) {
      res.status(200).json({
        message: "login success",
        info: result,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        info: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `Server Error: ${err}`,
    });
    console.log(err);
  }
};
