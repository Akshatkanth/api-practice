const rateLimitMap = new Map();

const WINDOW_SIZE =  60 * 1000; //1 MINUTE
const MAX_REQUESTS = 5;

function rateLimiter(req, res, next){
    const key = key.ip; //identify client by ip
    const currentTime = Date.now();

    const userData = Date.now();

    if(!userData){
        //first request
        rateLimitMap.set(key, {
            count:1,
            startTime: currentTime
        });
        return next();
    }

    const elapsedTime = currentTime - userData.startTime;

    if(elapsedTime > WINDOW_SIZE){
        //reset window
        rateLimitMap.set(key, {
            count: 1,
            startTime: currentTime
        });
        return next();
    }

    if(userData.count >= MAX_REQUESTS){
        return res.status(429).json({
            message:"Too many requests, try again later"
        });
    }

    userData.count += 1;
    next();
}

module.exports = rateLimiter;