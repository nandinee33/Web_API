const express =require("express");
require("../src/db/conn");

const StudentRanking =require("../src/models/student");

const app=express();
const port = process.env.PORT ||3000;

app.use(express.json());


//we will handle post req
app.post("/student",async(req,res)=>{
    try{
        const addingstudentrecords = new StudentRanking(req.body)
        console.log(req.body);
           
        const insertStudent = await addingstudentrecords.save();
        res.status(201).send(insertStudent);
    }catch(e){
        res.status(400).send(e);
    }
})


//we will handle get req
app.get("/student",async(req,res)=>{
    try{
        const getStudent= await StudentRanking.find({}).sort({"universityrollno":1});
        res.send(getStudent);
    }catch(e){
        res.status(400).send(e);
    }
})


//we will handle get req of indiv
app.get("/student/:id",async(req,res)=>{
    try{
        const _id =req.params.id;
        const getStudents= await StudentRanking.findById({_id});
        res.send(getStudents);
    }catch(e){
        res.status(400).send(e);
    }
})




//we will handle patch req of indiv
app.patch("/student/:id",async(req,res)=>{
    try{
        const _id =req.params.id;
        const getStudents= await StudentRanking.findByIdAndUpdate(_id,req.body,{new:true});
        res.send(getStudents);
    }catch(e){
        res.status(500).send(e);
    }
})


//we will handle delete req of indiv
app.delete("/student/:id",async(req,res)=>{
    try{
        
        const getStudents= await StudentRanking.findByIdAndDelete(req.params.id);
        res.send(getStudents);
    }catch(e){
        res.status(500).send(e);
    }
})

app.listen(port,()=>{
    console.log(`connection is live at port no. ${port}`);
})