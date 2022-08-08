require("dotenv").config();
const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const port = process.env.APP_PORT || 3000; // ENV Config
const userRouter = require('./routes/userRouter');


// USE JSON in APP 
app.use(express.json())

// Mongoose Connection Here
mongoose.connect(process.env.MONGODB_URL+process.env.MONGODB_DATABASE)
        .then(()=> {
            console.log("Succesfully DB Conected!")
        })
        .catch((err)=> {
            console.log(err)
        })



// App Home Route
app.get('/', (req, res) => {
    res.json("Welcome To our Blog!")
})

// User Router Here
app.use('/user', userRouter)

// Server Listening
app.listen(port, ()=>{
    console.log(`Server started at port {${port}}`)
})