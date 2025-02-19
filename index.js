const express = require('express');
const { resolve } = require('path');
const mongoose =require("mongoose")
const {UserModel,ProfileModel}=require("./schema")
const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json())
let mongoUrl="mongodb+srv://selvadhanushjc:6XSMtzPb0kU8dUoi@cluster0.vsfis.mongodb.net/assinment?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)
.then((res)=>{
  console.log("connected successfully")
})
.catch((err)=>{
  console.log(err)
})

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
 

app.post("/create",async(req,res)=>{
  try {
    let newUser= new UserModel(req.body)
    await newUser.save()
    res.status(200).json("created")
  } 
  catch (error) {
    console.log(error)
    res.status(500).json("internal serveer error")
  }
  
})



app.post("/profile",async(req,res)=>{
  try {

    let newPro= new ProfileModel(req.body)
    await newPro.save()
    res.status(200).json("ghgggg")
  } 
  catch (error) {
    res.status(500).json("internal serveer error")
  }
  
})


app.get("/profile",async(req,res)=>{
  try {
    
    let data=await ProfileModel.find().populate("user")
    res.status(200).json({data:data})
  } 
  catch (error) {
    res.status(500).json("internal serveer error")
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
