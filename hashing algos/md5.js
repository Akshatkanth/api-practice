const crypto = require("crypto")

function hashWithMD5(input){
    const hash = crypto
        .createHash("md5")
        .update(input)
        .digest("hex");

    return hash;
}

const password = "mySecretPassword"
const hashedPassword = hashWithMD5(password)

console.log("Orignial:", password)
console.log("MD5 Hashed password:", hashedPassword)