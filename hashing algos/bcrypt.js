import bcrypt from 'bcrypt'
import express from 'express'

const app = express()



//creating a simple db

app.use(express.json())
const users = []


app.post('/signup', async (req, res) => {
    const {username, password} = req.body
    const hash = await bcrypt.hash(password, 12)
    users.push({
        username, 
        password: hash
    }) 
    console.log("users:", users)
    res.send('Ok')      
})
app.listen(3000, () => console.log('Server running on port 3000'))
// const password = 'Password1'

// const salt = bcrypt.genSaltSync(10)

// console.time("hash")
// const hash = await bcrypt.hash(password, 10);

// const isMatch = await bcrypt.compare("Password2", hash)
// console.log(isMatch)

// console.timeEnd("hash")
// console.log({
//     password,
    
//     hash
// })