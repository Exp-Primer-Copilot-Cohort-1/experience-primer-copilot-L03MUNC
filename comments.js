// Create web server
// Create a server that listens on port 3000
// Use the comments module from the previous exercise
// The server should respond to GET requests to /comments with a list of comments

// The server should respond to POST requests to /comments with a new comment
// A new comment should be added to the list of comments
// The server should respond with the list of comments
// Use the comments module to store the list of comments

// The server should respond with a 404 Not Found status code for any other path
// The server should respond with a 405 Method Not Allowed status code for any other method

const http = require('http');
const comments = require('./comments');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/comments') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(comments.list));
  } else if (req.method === 'POST' && req.url === '/comments') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newComment = JSON.parse(body);
      comments.add(newComment);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(comments.list));
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000);
console.log('Server listening on port 3000');