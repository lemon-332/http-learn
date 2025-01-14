/**
 * rsa 非对称加密算法
 * 公钥和解密的密钥不一样 但是他们有关系
 * 正向算很容易，反向计算很困难
 * 公钥加密，私钥解密 =》数据加密
 * 私钥加密，公钥解密 =》数字签名
 * A,B 都有自己的公钥和私钥，A把自己的公钥发给B，B也把自己的公钥发给A，当
 * A需要发送数据给B时候，A可以用B发给自己的公钥加密，那么，B接受到数据之后
 * 就可以用B自己的私钥解密，这就是非对称加密
 */

// 1. 公钥加密，私钥解密     数据加密
const {
  generateKeyPairSync,
  privateEncrypt,
  publicDecrypt,
  createSign,
  createVerify,
  createHash,
} = require("crypto");

let passphrase = "123456";

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
    passphrase, // 密码
  },
});

let data = "hello world";

let encryptMessage = privateEncrypt(
  {
    key: rsa.privateKey,
    passphrase,
  },
  Buffer.from(data, "utf8")
);

// console.log(encryptMessage.toString("base64"));

const decryptMessage = publicDecrypt(
  {
    key: rsa.publicKey,
  },
  encryptMessage
);

// console.log(decryptMessage.toString("utf8"));

// 2. 私钥加密，公钥解密     数字签名

// ! 实现数字签名
// 创建签名需要文件和私钥
const file = "file";
const sign = createSign("RSA-SHA256").update(file);
const signInfo = sign.sign(
  {
    key: rsa.privateKey,
    passphrase,
    format: "pem",
  },
  "hex"
);
// console.log(signInfo);

// 验证签名需要文件，公钥，和签名
const verify = createVerify("RSA-SHA256").update(file);
const verifyInfo = verify.verify(rsa.publicKey, signInfo, "hex");
// console.log(verifyInfo);

//! 实现数字证书  ************************

let serverRsa = generateKeyPairSync("rsa", {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: "spki",
    format: "pem", // base64格式的公钥
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase, // 密码
  },
});

const getSign = (content, privateKey, passphrase) => {
  const sign = createSign("RSA-SHA256").update(content);
  return sign.sign({ key: privateKey, passphrase, format: "pem" }, "hex");
};

const verifySign = (content, publicKey, sign) => {
  const verify = createVerify("RSA-SHA256").update(content);
  return verify.verify(publicKey, sign, "hex");
};

// 把这个信息发给CA机构，请求颁发证书
const info = {
  domain: "http://127.0.0.1:8080",
  publicKey: serverRsa.publicKey, // 把公钥发给CA机构 下面rsa默认CA机构
};

const verHash = createHash("sha256").update(JSON.stringify(info)).digest("hex"); // 生成hash值

const verSign = getSign(verHash, rsa.privateKey, passphrase); // 生成签名 用CA的私钥生成

const valid = verifySign(verHash, rsa.publicKey, verSign); // 用·CA的公钥验证签名

console.log(valid);
