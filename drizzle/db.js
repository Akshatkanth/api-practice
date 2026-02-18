require("dotenv").config({path:"../.env"})
const { drizzle } = require("drizzle-orm/node-postgres");
const { Client } = require("pg");

const client = new Client({
    host:"localhost",
    port:5432,
    user: "postgres",
    password:process.env.db_password,
    database: "drizzle_db"
});

async function connectDB(){
    await client.connect();
    console.log("PostgreSQL connected");
}

const db = drizzle(client);

module.exports = { db, connectDB };