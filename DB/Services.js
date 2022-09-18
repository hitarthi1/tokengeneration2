const mongoose = require('mongoose');
const service=new mongoose.Schema({
    services_id:Number,
        services_name:String,
        services_time:Number,
})
const winSchema = new mongoose.Schema( {
    windo_no:Number,

    services:[service],



    time:{
        start_time:  {hours: {
            type: Number, min: 0, max: 23
          },
         minutes: {
            type: Number,  min: 0, max: 59
          }
         },

        current_time:  {hours: {
            type: Number,  min: 0, max: 23
        },
        minutes: {
            type: Number,  min: 0, max: 59
        }},
        
        end_time:  {hours: {
            type: Number,  min: 0, max: 23
        },
        minutes: {
            type: Number,  min: 0, max: 59
        }},
   
    },

    date:[{
        date:Date ,
        holiday:Boolean,
        allocation:[{
            tokenid:Number,
            compelte:Boolean,
            m_number:Number,
            services_id:Number,
            allocated_time:{hours: {
                type: Number,  min: 0, max: 23
            },
            minutes: {
                type: Number, min: 0, max: 59
            }},

        }]
    




    }]

});

module.exports = mongoose.model('Window', winSchema)