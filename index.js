const express = require('express');
const ID = require("nodejs-unique-numeric-id-generator")
const cors = require('cors');
require('./DB/Config');
const router=require('./routes/services_routes')

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
// make register API (routes)
// app.post('/register', async (req, res)=>{
//     let user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject();
//     delete result.password;
//     res.send(result);
// })
var d = new Date(Date.now());
d.toString() 
ID.generate(new Date().toJSON());
// console.log("message server running succesfully",Date.now().toLocaleString())
console.log("message server running succesfully",ID.generate(new Date().toJSON()))
console.log("message server running suuuuuuuuuuuuuuuuuuuccesfully",ID.generate(new Date().toJSON()))

app.listen(5000,()=> console.log("serverstarted"));