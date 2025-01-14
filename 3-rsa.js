/**
 * rsa 非对称加密算法
 * 公钥和解密的密钥不一样 但是他们有关系
 * 正向算很容易，反向计算很困难
 * 公钥加密，私钥解密 ，私钥加密，公钥解密
 * A,B 都有自己的公钥和私钥，A把自己的公钥发给B，B也把自己的公钥发给A，当
 * A需要发送数据给B时候，A可以用B发给自己的公钥加密，那么，B接受到数据之后
 * 就可以用B自己的私钥解密，这就是非对称加密
 */
const {
  generateKeyPairSync,
  privateEncrypt,
  publicDecrypt,
} = require("crypto");

let rsa = generateKeyPairSync("rsa", {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: "spki",
    format: "pem", // base64格式的公钥
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "123456", // 密码
  },
});

let data = "hello world";

let encryptMessage = privateEncrypt(
  {
    key: rsa.privateKey,
    passphrase: "123456",
  },
  Buffer.from(data, "utf8")
);

console.log(encryptMessage.toString("base64"));

const decryptMessage = publicDecrypt(
  {
    key: rsa.publicKey,
  },
  encryptMessage
);

console.log(decryptMessage.toString("utf8"));
