const express = require('express');
const ID = require("nodejs-unique-numeric-id-generator")
const cors = require('cors');
require('./DB/Config');
const router=require('./routes/services_routes')
// const nodeCron = require('node-cron');

const Services = require("./DB/Services");
const { default: mongoose } = require('mongoose');

const app = express(); 

//middleware
app.use(express.json());
app.use(cors());

const db=mongoose.connection
db.on('error',()=>console.log('connection not done'))
db.once('open',()=>console.log('connection done'))

app.use('/',router)
// const job = nodeCron.schedule("30 5 2 * * *", () => {
//     console.log(new Date().toLocaleString());
    
//   }, 
// //   { scheduled: true, timezone: 'Asia/Bangkok' }
//   );

// var d = new Date(Date.now());
// d.toString() 
// ID.generate(new Date().toJSON());
// /console.log("message server running succesfully",Date.now().toLocaleString())
// console.log("message server running succesfully",ID.generate(new Date().toJSON()))
// console.log("message server running suuuuuuuuuuuuuuuuuuuccesfully",ID.generate(new Date().toJSON()))

app.listen(5000,()=> console.log("serverstarted"));