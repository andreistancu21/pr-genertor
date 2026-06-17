const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

const mimeTypes = {
  ".html": "text/html; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".js": "application/javascript; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sendFile(filePath, res) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8" });
        res.end("404 - File not found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain; charset=UTF-8" });
        res.end("500 - Internal server error");
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const requestPath = req.url === "/" ? "/index.html" : req.url;
  const normalizedPath = path.normalize(requestPath).replace(/^\/+/, "");
  const fullPath = path.join(publicDir, normalizedPath);

  // Block path traversal outside public directory.
  if (!fullPath.startsWith(publicDir)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=UTF-8" });
    res.end("403 - Forbidden");
    return;
  }

  sendFile(fullPath, res);
});

server.listen(port, () => {
  console.log(`AI workshop app running on http://localhost:${port}`);
});
