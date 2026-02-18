const {pgTable, serial, text} = require("drizzle-orm/pg-core")

const users = pgTable ("users", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email"),
});

module.exports = {users}