const db = require("../../database.js");
const utils = require("../../utils/auth");

module.exports = (req, res, next) => {
    try{
        if (!req.body.sessionUser || !req.body.expenseID) {
                res.status(400).json({"errors":"Missing Request Parameter"});
                return;
        }
        const verified = utils.processJWT(req)
        if (!verified){
            const request_data = {  
                expenseID:req.body.expenseID,
            };
            db.all(`select * from expenses where id=?`, [request_data.expenseID], (err, rows) => {
                if (err) {
                  res.status(400).json({"error":err.message});
                  console.log(err);
                  return;
                }
                res.json({
                    "message":"success",
                    "data":rows
                })
              });
        } else {
            res.status(401).json({"errors":verified});
        }    
    } catch (error){
        console.log(error.message);
        res.status(500).json({"errors":error.message});
        return;
    }
};