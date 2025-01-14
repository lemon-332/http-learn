// 公开的
let N = 23;
let p = 5;

// 独自特有的
let secret1 = 6;
let secret2 = 14;

let A = Math.pow(p, secret1) % N;
let B = Math.pow(p, secret2) % N;

// console.log(Math.pow(A, secret2) % N === Math.pow(B, secret1) % N);

const { createDiffieHellman } = require("crypto");

// 客户端
const client = createDiffieHellman(512);
const clientKeys = client.generateKeys();
const prime = client.getPrime();
const generator = client.getGenerator();

// 服务器
const server = createDiffieHellman(prime, generator);
const serverKeys = server.generateKeys();

const client_secret = client.computeSecret(serverKeys);
const server_secret = server.computeSecret(clientKeys);

console.log(client_secret.toString("hex"));

console.log(server_secret.toString("hex"));
