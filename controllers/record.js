const record = require("../model/record");

const addRecord = async (req, res) => {
  const { Sales, Purchase, Expend } = req.body;
  try {
    const recordData = await record.create({ Sales, Purchase, Expend });
    return res
      .status(200)
      .json({ status: 200, message: "Record added", data: recordData });
  } catch (error) {
    console.log(error);
  }
};

const getRecord = async (req, res) => {
  let { filter } = req.query;
  if (!filter) {
    filter = "today";
  }
  try {
    let startDate = new Date();
    let endDate = new Date();
    if (filter === "today") {
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
    }
    if (filter === "week") {
      startDate.setDate(startDate.getDate() - 7);
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
    }
    if (filter === "month") {
      startDate.setDate(startDate.getDate() - 30);
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
    }
    if (filter === "year") {
      startDate.setDate(startDate.getDate() - 365);
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
    }
    startDate = startDate.toISOString().split("T")[0];
    endDate = endDate.toISOString().split("T")[0];
    const recordData = await record.find({
      $or: [
        { "Sales.date": { $gte: startDate, $lte: endDate } },
        { "Purchase.date": { $gte: startDate, $lte: endDate } },
        { "Expend.date": { $gte: startDate, $lte: endDate } },
      ],
    });
    const data = {
      Sales: [],
      Purchase: [],
      Expend: [],
    };
    let tempStartDate = startDate.split("-").join("");
    let tempEndDate = endDate.split("-").join("");
    tempStartDate = parseInt(tempStartDate);
    tempEndDate = parseInt(tempEndDate);
    await Promise.all(
      recordData.map(async (item) => {
        await Promise.all(
          item.Sales.map(async (sale) => {
            let saleDate = sale.date.toISOString().split("T")[0];
            saleDate = saleDate.split("-").join("");
            saleDate = parseInt(saleDate);
            if (saleDate >= tempStartDate && saleDate <= tempEndDate) {
              data.Sales.push(sale);
            }
          })
        );
        await Promise.all(
          item.Purchase.map(async (purchase) => {
            let purchaseDate = purchase.date.toISOString().split("T")[0];
            purchaseDate = purchaseDate.split("-").join("");
            purchaseDate = parseInt(purchaseDate);
            if (purchaseDate >= tempStartDate && purchaseDate <= tempEndDate) {
              data.Purchase.push(purchase);
            }
          })
        );
        await Promise.all(
          item.Expend.map(async (expend) => {
            let expendDate = expend.date.toISOString().split("T")[0];
            expendDate = expendDate.split("-").join("");
            expendDate = parseInt(expendDate);
            if (expendDate >= tempStartDate && expendDate <= tempEndDate) {
              data.Expend.push(expend);
            }
          })
        );
      })
    );
    return res
      .status(200)
      .json({ status: 200, message: "Record fetched", data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addRecord,
  getRecord,
};
