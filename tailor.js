const http = require('https');
const Tailor = require('node-tailor');
const tailor = new Tailor({templatesPath: __dirname + '/templates'});
// const server = http.createServer(tailor.requestHandler);
// server.listen(process.env.PORT || 8080);


http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' })
      return res.end('help');
    }

    req.headers['x-request-uri'] = req.url
    req.url = '/index'

    tailor.requestHandler(req, res)
  })
  .listen(8080, function() {
    console.log('Tailor server listening on port 8080')
  })

  // Fragment server - Any http server that can serve fragments
http
.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('sddas');
})
.listen(8081, function() {
    console.log('Fragment Server listening on port 8081');
});

// Fragment server - Any http server that can serve fragments
http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end('<div>Fragment 2</div>');
    })
    .listen(8082, function() {
        console.log('Fragment Server listening on port 8082');
    });

