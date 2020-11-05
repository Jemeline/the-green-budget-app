const db = require("../../database.js");
const utils = require("../../utils/auth");

module.exports = (req, res) => {
    let sql = "select * from expenses"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
};