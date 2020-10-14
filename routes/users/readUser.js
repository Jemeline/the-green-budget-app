const db = require("../../database.js");

module.exports = (req, res, next) => {
  let errors = [];
  if (!req.body.email){
    errors.push("You must supply your email.");
  }
  // // Begin JWT Validation
  // if (!req.body.sessionUser){
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
  if (errors.length > 0){
    res.status(400).json({"errors":errors});
    return;
  }
  let sql = "select * from users_table where email=?"
    let params = [req.body.email]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if (rows.length == 0){
            res.status(404).json({"error":"User Does Not Exist"});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
};
