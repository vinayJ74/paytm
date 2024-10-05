const express = require("express");

const route=express.Router();
const app=express()
// const cors=require("cors");
app.use(express.json());


// Replace import with require


app.use("./route")

