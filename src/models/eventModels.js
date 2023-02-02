const mongoose=require('mongoose')

const event=new mongoose.Schema({
    event_name:{
        type:String,   
    },
    event_time:{
        type:String
    },
    
},
{timestamps:true})

module.exports=mongoose.model("event",event)