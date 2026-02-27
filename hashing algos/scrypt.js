const crypto = require("crypto")

const password = "mySecretPassword"

const salt = crypto.randomBytes(16).toString("hex")

crypto.scrypt(password, salt, 64, (err, derivedKey) =>{
    if(err) throw err;

    console.log("Password: ", password),
    console.log("Salt: ", salt)
    console.log("Hash: ", derivedKey.toString("hex"));
})

//simulating login

crypto.scrypt(password, salt, 64, (err, derivedKey) => {
  const storedHash = derivedKey.toString("hex");

  // simulate login
  const loginPassword = "mySecretPassword";

  crypto.scrypt(loginPassword, salt, 64, (err, loginKey) => {
    const loginHash = loginKey.toString("hex");

    console.log("Match:", storedHash === loginHash);
  });
});