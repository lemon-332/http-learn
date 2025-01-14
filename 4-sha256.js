const crypto = require("crypto");

const message = "hello world";

const md5 = crypto.createHash("md5").update(message).digest("hex");

// 盐值，可以使得加密后的结果更加复杂，防止彩虹表攻击，不同的盐值，加密的结果也会不同
const salt = "123456";
const sha256 = crypto.createHmac("sha256", salt).update(message).digest("hex");

console.log(`MD5: ${md5}`);
console.log(`SHA256: ${sha256}`);
