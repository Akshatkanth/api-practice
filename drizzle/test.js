const {db, connectDB} = require("./db")
const {users} = require("./schema")

async function main(){
    await connectDB();

    //insert a user
    await db.insert(users).values({
        name:"Akshat",
        email:"akshat@test.com"
    });

    console.log("user inserted");

    //fetch users
    const allUsers = await db.select().from(users);
    console.log("All users: ", allUsers);

    process.exit(0);
}

main();