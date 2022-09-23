const mongoose = require('mongoose');
const poolSchema=new mongoose.Schema({
    
        s_name:String,
        s_no:String,
        s_bring:String,
        winows_id:[
            {
                type: Number
            },
        ]
       
})
module.exports = mongoose.model('Pool', poolSchema)