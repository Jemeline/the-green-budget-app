const db = require("../../database.js");
const utils = require("../../utils/auth");

module.exports = (req, res, next) => {
    try{
        if (!req.body.sessionUser || !req.body.expenseUser ) {
                res.status(400).json({"errors":"Missing Request Parameter"});
                return;
        }
        if (req.body.sessionUser !== "admin@email.com") {
            res.status(400).json({"errors":"Administrative Access Only"});
            return;
        }
        const verified = utils.processJWT(req)
        if (!verified){
            const request_data = {  
                expenseUser:req.body.expenseUser,
            };
            db.run(`DELETE FROM expenses WHERE email = ?`, [request_data.expenseUser], 
                function(err) {
                        if (err) {
                        res.status(400).json({"error":err.message});
                        console.log(err);
                        return;
                }
                res.json({
                    "message": "success",
                    "data": request_data
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