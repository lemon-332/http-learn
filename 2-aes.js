const crypto = require("crypto");

/**
 *  对称算法加密 AES
 * @param {*} data 需要加密的数据
 * @param {*} key 用于加密的密钥，aes如果是256位，则需要32字节，128位需要16字节
 * @param {*} iv 用于加密的向量，同上
 * @returns
 */

const encrypt = (data, key, iv) => {
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  cipher.update(data);
  return cipher.final("hex"); // 结果输出16进制字符串
};

const decrypt = (data, key, iv) => {
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  decipher.update(data, "hex");
  return decipher.final("utf8");
};

let data = "abc";
const key = "1234567890123456";
const iv = "1234567890123456";

console.log((data = encrypt(data, key, iv)));

console.log(decrypt(data, key, iv));
