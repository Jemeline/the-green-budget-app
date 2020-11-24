const db = require("../../database.js");
const utils = require("../../utils/auth");

module.exports = (req, res, next) => {
    try{
        if (!req.body.sessionUser || !req.body.incomeUser) {
                res.status(400).json({"errors":"Missing Request Parameter"});
                return;
        }
        const verified = utils.processJWT(req)
        if (!verified){
            const request_data = {  
                incomeUser:req.body.incomeUser,
            };
            db.all(`select i.* from income i where email=? order by i.date desc`, [request_data.incomeUser], (err, rows) => {
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