// console.log("Hello, Developers !");
const fs = require("fs");
const http = require("http");
const path = require("path");
const os = require("os");
const url = require("url");
const crypto = require("crypto");
const sayHello = require("./greetings");
const math = require("./math");
const lodash = require("lodash");

// ==================== FS SECTION ==================== //

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

// ==================== HTTP SECTION ==================== //

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello, World");
// });

// server.listen(3000, () => {
//   console.log("Server runing at http://localhost:3000");
// });

// ==================== PATH SECTION ==================== //

// const directory = "./user/local";
// const fileName = "example.tkt";

// const fullPath = path.join(directory, fileName);

// console.log(fullPath);

// ==================== OS SECTION ==================== //

// console.log("Platform : ", os.platform());
// console.log("CPU Arch : ", os.arch());
// console.log("Total Memory : ", os.totalmem());
// console.log("Free Memory : ", os.freemem());

// ==================== URL SECTION ==================== //

// const myURL = new URL("https://example.com:8080/path/name?query=hello#hash");
// console.log("Host : ", myURL.host);
// console.log("PathName : ", myURL.pathname);
// console.log("Search Params : ", myURL.searchParams.get("query"));

// ==================== CRYPTO SECTION ==================== //

// const hash = crypto.createHash("sha256");
// hash.update("Hello World");
// console.log(hash.digest("hex"));

// ==================== MODULES ====================
// const message = sayHello("0xCrypt0nic");
// console.log(message);
// console.log("Testing with math module");
// console.log(`5 + 10 = ${math.add(5, 10)}`);
// console.log(`5 - 4 = ${math.subtract(5, 4)}`);

// ==================== NPM PACKAGE MANAGER ==================== //
// const numbers = [1, 2, 3, 4, 5];
// const reversed = lodash.reverse(numbers);
// console.log(reversed);

// ==================== STREAM ==================== //
// const readableStream = fs.createReadStream("./example.txt", {
//   encoding: "utf-8",
// });

// readableStream.on("data", (chunk) => {
//   console.log(chunk);
// });

// readableStream.on("end", () => {
//   console.log("Finished reading the file.");
// });

// readableStream.on("error", (er) => {
//   console.error("Error", err);
// });

// const writableStream = fs.createWriteStream("./output2.txt");
// writableStream.write("Hello, ");
// writableStream.write("World !");
// writableStream.end();
// writableStream.on("finish", () => {
//   console.log("Finished writing to the file.");
// });

// ==================== PIPING STREAM ==================== //

// const readableStream = fs.createReadStream("./example.txt");
// const writableStream = fs.createWriteStream("./example-output.txt");

// readableStream.pipe(writableStream);
// writableStream.on("finish", () => {
//   console.log("File copied successfully");
// });

// ==================== READLINE MODULE ==================== //
// const readline = require("readline");
// const readableStream = fs.createReadStream("./example.txt");
// const rl = readline.createInterface({ input: readableStream });
// rl.on("line", (line) => {
//   console.log(`Line: ${line}`);
// });
// rl.on("close", () => {
//   console.log("Finished processing the file");
// });

// ===================== DIRECTORY ===================== //

// 1. Create a Directory

// fs.mkdir("newDirectory", (err) => {
//   if (err) {
//     return console.error(`Error creating directory: ${err}`);
//   }
//   console.log("Directory created successfully");
// });

// fs.mkdirSync("newDirectory2");
// console.log("Directory created successfully");

// 2. Reading a Directory

// fs.readdir("./", (err, files) => {
//   if (err) {
//     return console.error(`Error reading directory: ${err}`);
//   }
//   console.log(`Directory content ${files}`);
// });

// const files = fs.readdirSync("./");
// console.log(`Directory content ${files}`);

// 3. Checking if Directory exists

// console.log(
//   fs.existsSync("newDirectory")
//     ? "Directory exists"
//     : "Directory does not exists"
// );

// 4. Removing a Directory

// fs.rmdir("newDirectory2", (err) => {
//   err
//     ? console.error(`Error removing directory: ${err}`)
//     : console.log("Directory removed successfully");
// });

// If directory is not empty
// fs.rm("newDirectory2", { recursive: true }, (err) => {
//   err
//     ? console.error(`Error removing directory: ${err}`)
//     : console.log("Directory removed successfully");
// });

// 5. Renaming a Directory

// fs.rename("./folder1", "./folder2", (err) => {
//   err
//     ? console.error(`Error renaming directory: ${err}`)
//     : console.log("Directory renamed successfully");
// });

// 6. Getting Directory Stats

// fs.stat("../day1_nodeJS_update", (err, stats) => {
//   err ? console.error(err) : console.log("is directory :", stats.isDirectory());
// });

// 7. Watching a Directory

// fs.watch("../day1_nodeJS_update", (eventType, filename) => {
//   console.log(`Event: ${eventType}`);
//   if (filename) {
//     console.log(`FileName: ${filename}`);
//   }
// });

// ==================== EVENT EMITTERS ==================== //

const EventEmitter = require("events");

const emitter = new EventEmitter();

// Registering a event listener
// emitter.on("test1", () => {
//   console.log("An event has occured");
// });

// emitter.emit("test1");

// 1. Adding Multiple events

// emitter.on("test1", () => {
//   console.log("An event has occured in test1");
// });

// emitter.on("test1", () => {
//   console.log("An event has occured in test2");
// });

// emitter.emit("test1");

// 2. Removing event listener

// emitter.on("test1", () => {
//   console.log("An event has occured in test1");
// });

// emitter.emit("test1");

// emitter.removeListener("test1");

// emitter.emit("test1");

// 3. Handling error event

emitter.on("test1", () => {
  console.log("An event has occured in test1");
});

emitter.on("error", (err) => {
  console.error("Error event : ", err.message);
});

try {
  emitter.emit("test1");
  emitter.removeListener("test1");
  emitter.emit("test1");
} catch (error) {
  emitter.emit("error", error);
}
