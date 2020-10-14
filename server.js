const express = require('express');
const cors = require('cors');
const router = express.Router();
const db = require("./database.js");
const routes = require("./routes");


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//  Routing
app.use('/api', routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports=router;

