const db = require("../../database.js");
const utils = require("../../utils/auth");
module.exports = (req, res, next) => {
    try{
        if (!req.body.sessionUser || !req.body.expenseID ) {
                res.status(400).json({"errors":"Missing Request Parameter"});
                return;
        }
        const category = req.body.category;
        const description = req.body.description;
        if (category){
            category.toUpperCase();
        }
        if (description){
            description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
        }
        const verified = utils.processJWT(req)
        if (!verified){
            const request_data = {
                expenseID: req.body.expenseID,
                year:req.body.year,
                month:req.body.month,
                day:req.body.day,
                category:category,
                description:description,
                amount:req.body.amount
            };
            console.log(request_data);
            db.run(`UPDATE expenses set
                year = COALESCE(?,year), 
                month = COALESCE(?,month),
                day = COALESCE(?,day),
                category = COALESCE(?,category),
                description = COALESCE(?,description),
                amount = COALESCE(?,amount)
                where id=?`, 
                    [request_data.year, request_data.month,
                    request_data.day,request_data.category, request_data.description,
                    request_data.amount, request_data.expenseID], 
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

