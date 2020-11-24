const db = require("../../database.js");
const utils = require("../../utils/auth");
module.exports = (req, res, next) => {
    try{
        if (!req.body.email || !req.body.date || !req.body.category || !req.body.description || 
            !req.body.amount || !req.body.sessionUser) {
                res.status(400).json({"errors":"Missing Request Parameter"});
                return;
        }
        const verified = utils.processJWT(req)
        if (!verified){
            const request_data = {  
                email:req.body.email,
                date:req.body.date,
                category:req.body.category,
                description:req.body.description,
                amount:req.body.amount
            };
            db.run(`INSERT INTO income (email, date, category, description, amount) VALUES (?,?,?,?,?)`, 
                    [request_data.email,request_data.date,request_data.category,
                        request_data.description,request_data.amount], 
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

