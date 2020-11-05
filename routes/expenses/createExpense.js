const db = require("../../database.js");
const utils = require("../../utils/auth");
module.exports = (req, res, next) => {
    try{
        if (!req.body.email || !req.body.year || !req.body.month
            || !req.body.day || !req.body.category || !req.body.description || 
            !req.body.amount || !req.body.sessionUser) {
                res.status(400).json({"errors":"Missing Request Parameter"});
                return;
        }
        const verified = utils.processJWT(req)
        if (!verified){
            const request_data = {  
                email:req.body.email,
                year:req.body.year,
                month:req.body.month,
                day:req.body.day,
                category:req.body.category.toUpperCase(),
                description:req.body.description.charAt(0).toUpperCase() + req.body.description.slice(1).toLowerCase(),
                amount:req.body.amount
            };
            db.run(`INSERT INTO expenses (email, year, month, day, 
                    category, description, amount) VALUES (?,?,?,?,?,?,?)`, 
                    [request_data.email,request_data.year, request_data.month,
                    request_data.day,request_data.category, request_data.description,
                    request_data.amount], 
                function(err) {
                        if (err) {
                        res.status(400).json({"error":err.message});
                        console.log(err);
                        return;
                }
                res.json({
                    "message": "success",
                    "data": request_data,
                    "id" : this.lastID
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

