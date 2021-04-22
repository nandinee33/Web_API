var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const index = express()

index.use(bodyParser.json())
index.use(express.static('public'))
index.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

index.post("/sign_up",(req, res)=>{
    var username = req.body.username;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "username": username,
        "email" : email,
        "phone": phone,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index2.html')

})


index.get("/",(req, res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index2.html');
}).listen(3000);


console.log("Listening on PORT 3000");