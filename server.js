const express = require("express");
const app = express();
const dotenv = require('dotenv').config()
const port = process.env.PORT||5001;
const router = require("./router/contactRouter");
const connectDb = require("./config/dbConnect");
const errorHandller = require("./middleware/errorHandller");

connectDb();
app.use(express.json())
app.use(errorHandller);
app.use("/contactAPI",router)
app.listen(port,()=>{
    console.log(`Welcomd ${port}`);
})