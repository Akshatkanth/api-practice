const crypto = require("crypto")

function sha256(input){
    return crypto
        .createHash("sha256")
        .update(input)
        .digest("hex")
}

const password = "mySecretPassword"
const hashed = sha256(password)

console.log("Original: ", password)
console.log("SHA-256:", hashed)