const { createClient } = require("redis")

const redisClient = createClient({
    url:"redis://localhost:6380"
});

redisClient.on("error", (err)=>{
    console.error("Redis Client Error", err)
});

(async () => {
    await redisClient.connect();
    console.log("Redis connected")
    await redisClient.set("node_test_key", "hello_from_node");
console.log("Wrote test key to Redis");

})();

console.log("Connecting to Redis at:", redisClient.options?.url);
//

module.exports = redisClient;