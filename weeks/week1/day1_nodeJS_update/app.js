// console.log("Hello, Developers !");
const fs = require("fs");
const http = require("http");

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

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World");
});

server.listen(3000, () => {
  console.log("Server runing at http://localhost:3000");
});
