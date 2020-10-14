const express = require('express');
const cors = require('cors');
const router = express.Router();
const db = require("./database.js");
const routes = require("./routes");
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//  Routing
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports=router;

