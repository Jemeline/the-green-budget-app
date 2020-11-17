const db = require("../../database.js");
const utils = require("../../utils/auth");
module.exports = (req, res, next) => {
    try{
        if (!req.body.sessionUser || !req.body.incomeID ) {
                res.status(400).json({"errors":"Missing Request Parameter"});
                console.log("missing");
                return;
        }
        const verified = utils.processJWT(req)
        if (!verified){
            const request_data = {
                incomeID: req.body.incomeID,
                date:req.body.date,
                category:req.body.category,
                description:req.body.description,
                amount:req.body.amount
            };
            console.log(request_data);
            db.run(`UPDATE income set
                date = COALESCE(?,date), 
                category = COALESCE(?,category),
                description = COALESCE(?,description),
                amount = COALESCE(?,amount)
                where id=?`, 
                    [request_data.date,request_data.category, request_data.description,
                    request_data.amount, request_data.incomeID], 
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

