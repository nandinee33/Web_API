const mongoose =require("mongoose");

const studentSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    universityrollno:{
        type:Number,
        required:true,
        
        unique:true
    },
    emailid:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    CPI:{
        type:Number,
        required:true,
        trim:true
    },
    section:{
        type:String,
        required:true,
        trim:true
    },
})
// we are creating a new collection
const StudentRanking =new mongoose.model("StudentRanking",studentSchema)

module.exports=StudentRanking;