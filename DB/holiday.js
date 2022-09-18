const mongoose = require('mongoose');
const holiSchema=new mongoose.Schema({
    holi_date:Date,
        holi_reason:String,
       
})
module.exports = mongoose.model('Holiday', holiSchema)