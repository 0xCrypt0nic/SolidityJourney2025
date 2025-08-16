const http = require("http");
const url = require("url");

// const server = http.createServer((req, res) => {
//   if (req.method === "GET" && req.url === "/") {
//     res.writeHead(200, { "content-type": "text/plain" });
//     res.end("Welcome to homepage");
//   } else {
//     res.writeHead(404, { "content-type": "text/plain" });
//     res.end("Page Not Found");
//   }
// });

// const server = http.createServer((req, res) => {
//   if (req.method === "POST" && req.url === "/submit") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       res.writeHead(200, { "content-type": "application/json" });
//       res.end(JSON.stringify({ message: "Data received", data: body }));
//     });
//   } else {
//     res.writeHead(404, { "content-type": "text/plain" });
//     res.end("Route not found");
//   }
// });

// ==================== Route Handler ==================== //

// 1. Routes in a Simple Way

// const routes = {
//   "/": (req, res) => {
//     res.writeHead(200, { "content-type": "text/plain" });
//     res.end("Welcome to Homepage");
//   },
//   "/about": (req, res) => {
//     res.writeHead(200, { "content-type": "text/plain" });
//     res.end("This is the About Page");
//   },
//   "/notfound": (req, res) => {
//     res.writeHead(404, { "content-type": "text/plain" });
//     res.end("Page Not Found");
//   },
// };

// const server = http.createServer((req, res) => {
//   const { pathname } = url.parse(req.url);
//   if (routes[pathname]) {
//     routes[pathname](req, res);
//   } else {
//     routes["/notfound"](req, res);
//   }
// });

// 2. Handling Dynamic Routes (website.com)

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  if (pathname.startsWith("/user/")) {
    const userId = pathname.split("/")[2];
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`User ID : ${userId}`);
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Route Not Found");
  }
});

// const server = http.createServer((req, res) => {
//   if (req.method === "GET" && req.url.startsWith("/search")) {
//     const queryObject = url.parse(req.url, true).query;
//     res.writeHead(200, {
//       "content-type": "application/json",
//       "custom-header": "Node JS Server",
//       "custom-tracking": "1234",
//     });
//     res.end(JSON.stringify({ message: "Query received", queryObject }));
//   } else {
//     res.writeHead(404, { "content-type": "text/plain" });
//     res.end("Route Not Found");
//   }
// });

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
