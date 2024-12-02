const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  // running automatically for favicon
  if (req.url === "/favicon.ico") return res.end();

  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  
  const log = `URL:${req.url}, New request received\n`;
  
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Hello root server");
        break;
      case "/about":
        const username = myUrl.query.myName
        res.end(`Hello, ${username}` );
        break;
      case "/contactus":
        res.end("Hello contact page");
        break;
      default:
        res.end("404 server error: URL NOT FOUND");
    }
  });
});

server.listen(9000, () => console.log("server started"));

// const server = http.createServer(function(req, res){

//     console.log('REQUEST URL--',req.url, req.headers, req.method);
//     res.end('Hello from server..')
// });

// server.listen(4000, () => {console.log('Server started')});
