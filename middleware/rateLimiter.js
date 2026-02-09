// const rateLimitMap = new Map();

const redisClient = require("../config/redis")

const WINDOW_SIZE =  60 * 1000; //1 MINUTE
const MAX_REQUESTS = 5;

async function redisRateLimiter(req, res, next){
    try{
        // const key = req.ip; //identify client by ip
        const key = `rate-limit:${req.ip}`
        
        //increase request count
        const currentCount = await redisClient.incr(key);

        //if first request, set expiry
        if(currentCount === 1){
            await redisClient.expire(key, WINDOW_SIZE)
        }

        //block if too many requests
        if(currentCount > MAX_REQUESTS){
            return res.status(429).json({
                message:"Too many requests. Try again later."
            });
        }

        next();

    }catch(error){
        console.error("Rate limiter error:", error)
        next(); //fail-open 
    }
}

module.exports = redisRateLimiter;

//     const userData = rateLimitMap.get(key);

//     if(!userData){
//         //first request
//         rateLimitMap.set(key, {
//             count:1,
//             startTime: currentTime
//         });
//         return next();
//     }

//     const elapsedTime = currentTime - userData.startTime;

//     if(elapsedTime > WINDOW_SIZE){
//         //reset window
//         rateLimitMap.set(key, {
//             count: 1,
//             startTime: currentTime
//         });
//         return next();
//     }

//     if(userData.count >= MAX_REQUESTS){
//         return res.status(429).json({
//             message:"Too many requests, try again later"
//         });
//     }

//     userData.count += 1;
//     next();
// }

