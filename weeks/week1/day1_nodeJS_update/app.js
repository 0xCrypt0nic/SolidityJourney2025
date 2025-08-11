// console.log("Hello, Developers !");
const fs = require("fs");
const http = require("http");
const path = require("path");
const os = require("os");
const url = require("url");
const crypto = require("crypto");

// ===== FS SECTION ===== //

// fs.readFile("./example.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

// const content = "Hello, NodeJS";

// fs.writeFile("./output.txt", content, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log('File written successfully');
// });

// ===== HTTP SECTION ===== //

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello, World");
// });

// server.listen(3000, () => {
//   console.log("Server runing at http://localhost:3000");
// });

// ===== PATH SECTION ===== //

// const directory = "./user/local";
// const fileName = "example.tkt";

// const fullPath = path.join(directory, fileName);

// console.log(fullPath);

// ===== OS SECTION ===== //

// console.log("Platform : ", os.platform());
// console.log("CPU Arch : ", os.arch());
// console.log("Total Memory : ", os.totalmem());
// console.log("Free Memory : ", os.freemem());

// ===== URL SECTION ===== //

// const myURL = new URL("https://example.com:8080/path/name?query=hello#hash");
// console.log("Host : ", myURL.host);
// console.log("PathName : ", myURL.pathname);
// console.log("Search Params : ", myURL.searchParams.get("query"));

// ===== CRYPTO SECTION ===== //

// const hash = crypto.createHash("sha256");
// hash.update("Hello World");
// console.log(hash.digest("hex"));
