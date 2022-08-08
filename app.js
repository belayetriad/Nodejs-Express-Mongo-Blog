require("dotenv").config();
const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const port = process.env.APP_PORT || 3000; 


const userRouter = require('./routes/userRouter');


app.use(express.json())
 
mongoose.connect(process.env.MONGODB_URL+process.env.MONGODB_DATABASE)
        .then(()=> {
            console.log("Succesfully DB Conected!")
        })
        .catch((err)=> {
            console.log(err)
        })



app.get('/', (req, res) => {
    res.json("Welcome To our Blog!")
})

app.use('/user', userRouter)

app.listen(port, ()=>{
    console.log(`Server started at port {${port}}`)
})