const smart= require("./src/smart.js")
const covalent = require("./src/covalent.js")

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const { parse } = require("dotenv");
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/",router);

const PORT = process.env.PORT || 5000

//code
router.post("/balance",async (req,res)=>{
  console.log(req.body);
  res.send(await smart.getabalance(req.body.address));
});

router.get("/transfer",async (req,res)=>{
  console.log(req.body);
  res.send(await smart.transfer(req.body.from,req.body.to,req.body.value));
});

router.post("/wbalance",async (req,res)=>{
  console.log(req.body);
  res.send(await covalent.getwbal(req.body.address,req.body.chain));
});
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`))