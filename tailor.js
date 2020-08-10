  
'use strict';
const express = require('express');
const http = require('http');
const Tailor = require('node-tailor');
const tailor = new Tailor({
    templatesPath: __dirname + '/templates'
});
const cors = require('cors');
let app = express();
app.use(cors());

// Root Server
http
    .createServer( (req, res) => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            /** add other headers as per requirement */
          };
        if (req.url === '/favicon.ico') {
            res.writeHead(200, headers, { 'Content-Type': 'image/x-icon' });
            return res.end('');
        }
        tailor.requestHandler(req, res, headers);
    })
    .listen(8080, function() {
        console.log('Tailor server listening on port 8080');
    });

// Fragment server - Any http server that can serve fragments
http
    .createServer( (req, res) => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            /** add other headers as per requirement */
          };
        // Every Fragment sends a link header that describes its resources - css and js
        const css = '<http://localhost:8081/App.css>; rel="stylesheet"';
        // this will be fetched using require-js as an amd module
        const js = '<http://localhost:3000/src/App.js>; rel="fragment-script"';

        res.writeHead(200, {
            Link: `${css}, ${js}`,
            headers: {headers},
            'Content-Type': 'text/html'
        });

        // fragment content
        res.end('<div>asjdlasdl</div>');
    })
    .listen(8081, function() {
        console.log('Fragment Server listening on port 8081');
    });