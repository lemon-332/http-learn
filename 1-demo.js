let secret = 3;

const encrypt = (message) => {
  const buffer = Buffer.from(message); // 将字符串转化为字节数组
  for (let i = 0; i < buffer.length; i++) {
    // 对每个字节进行异或操作
    // buffer[i] = buffer[i] ^ secret;
    buffer[i] = buffer[i] + secret; // 对每个字节进行加法操作
  }
  return buffer.toString(); // 将字节数组转化为字符串
};

const decrypt = (message) => {
  const buffer = Buffer.from(message);
  for (let i = 0; i < buffer.length; i++) {
    // 对每个字节进行异或操作
    // buffer[i] = buffer[i] ^ secret;
    buffer[i] = buffer[i] - secret;
  }
  return buffer.toString();
};

let message = "abc";

console.log((message = encrypt(message)));
console.log(decrypt(message));
