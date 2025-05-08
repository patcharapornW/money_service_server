const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.createFest = async (req, res) => {
  try {
    const { moneyDetail, moneyDate, moneyInOut, moneyType, userId,} = req.body;
    const result = await prisma.money_tb.create({
      data: {
        moneyDetail: moneyDetail,
        moneyDate: moneyDate,
        moneyInOut: parseFloat(moneyInOut),
        moneyType: parseInt(moneyType),
        userId: parseInt(userId),
      }
    });

    res.status(201).json({
      message: "เพิ่มข้อมูลสําเร็จ",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: `พบเจอปัญหาในการทำงาน: ${err}`
    });
    console.log('Error', err);
  }
}

exports.getAllFestByUser = async (req, res) => {
  try {
    const result = await prisma.fest_tb.findMany({
      where: {
        userId: parseInt(req.params.userId)
      }
    });
    res.status(200).json({
      message: "Ok",
      info: result
    });
  } catch (err) {
    res.status(500).json({
      message: `พบเจอปัญหาในการทำงาน: ${err}`
    });
    console.log('Error', err);
  }
};
