const { validate } = require('../models/eventModels')
const eventModel=require('../models/eventModels')
const isValidRequestBody = (requestBody) => {
    return Object.keys(requestBody).length > 0
}

const isValid = (value) => {
    {
        if (typeof value === "undefined" || value === null)
            return false

        if (typeof value === "string" && value.trim().length === 0)
            return false
    }
    return true
}

const createEvent=async function(req,res){
    try{
        let body=req.body
        if (!isValidRequestBody(body)) {
            return res.status(400).send({ status: false, msg: "Invalid request parameters, please provide valid event details" })
        }
        const {event_time, event_name}=body

        if(!isValid(event_time)){
            return res.status(400).send({ status: false, msg: "BAD REQUEST, please starting starting_time" })
        }

        if(!isValid(event_name)){
            return res.status(400).send({ status: false, msg: "BAD REQUEST, please starting event_name" })
        }
        const create=await eventModel.create(body)
        return res.status(201).send({ status: true, msg: "event created successfully", data: create })
    }
    catch(err){
        console.log(err)
    }
}

const getEvent=async function(req,res){
    try{
        const getdata=req.query
        let findData=await eventModel.find(getdata)
           
        let validateDataAM=[]
        let validateDataPM=[]
        for(let i in findData){
            if(findData[i].event_time.includes("AM")){
            validateDataAM.push(findData[i].event_time+' ' +findData[i].event_name)
            }
        }
        validateDataAM.push('12:00PM Lunch')
        validateDataPM.push('05:00PM Networking Event')
        for(let i in findData){
            if(findData[i].event_time.includes("PM")){
            validateDataPM.push(findData[i].event_time+' ' +findData[i].event_name)
            }
        }
        track1 = validateDataAM.sort()
        track2= validateDataPM.sort()
        return res.status(201).send({ status: true, track1, track2})
    }
    catch(err){
        console.log(err)
    }
}
module.exports.createEvent=createEvent
module.exports.getEvent=getEvent