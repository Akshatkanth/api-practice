const express = require('express')

const app = express();

app.get("/api/test", (req, res)=>{
    res.json({message:"Hello from backend"})
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})