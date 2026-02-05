require('dotenv').config();
const express = require("express")


const app = express()
const connectDB = require("./config/db")

app.use(express.json());
connectDB()

app.use("/auth", require("./routes/auth"))
app.use("/memos", require("./routes/memo"))
app.use("/user", require("./routes/user"))

app.get("/health", (req, res)=>{
    res.json({status:"Ok"})
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});