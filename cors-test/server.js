const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}))

app.get("/api/test", (req, res)=>{
    res.json({message:"Get request works"})
});

app.post("/api/test", (req, res)=>{
    res.json({message:"Post request works", body:req.body})
});


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})