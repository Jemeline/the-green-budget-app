const db = require("../../database.js");
const utils = require("../../utils/auth");

module.exports = (req, res) => {
    // // Begin JWT Validation
    // if (!req.params.sessionUser){
    //   errors.push("You must supply a sessionUser");
    // }
    // if(!req.headers['authorization']){
    //     errors.push("Missing authorization header.");
    // } else{
    //     token = req.headers['authorization'].replace('Bearer ', '');
    //     verified = utils.verifyJWTToken(token)
    //     if(!verified) {
    //         errors.push("Invalid Token");
    //     }
    //     if (verified['user'] != req.body.email){
    //         errors.push("Invalid User-Token Combo");
    //     }
    // }
    // // END JWT Validation
    // if (errors.length > 0){
    //   res.status(400).json({"errors":errors});
    //   return;
    // }
    
    let sql = "select * from users_table"
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