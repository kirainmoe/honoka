/* eslint prefer-arrow-callback: 0 */
/* eslint object-shorthand: 0 */
const bodyParser = require('body-parser');
const upload = require('multer')();
const sleep = require('system-sleep');

function server(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, X-Requested-With, X-Name'
    );
    res.header('X-Powered-By', 'Honoka Express Server');

    next();
  });

  app.get('/with/ok', function(req, res) {
    res.send('ok');
  });

  app.get('/with/json', function(req, res) {
    res.json({ hello: 'world' });
  });

  app.get('/with/blob', function(req, res) {
    const data = 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    const img = new Buffer(data, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': img.length
    });
    res.end(img);
  });

  app.get('/with/error', function(req, res) {
    res.status(400);
    res.send('error');
  });

  app.get('/with/timeout', function(req, res) {
    sleep(1000);
    res.send('timeout');
  });

  app.post('/with/post', function(req, res) {
    res.send('post');
  });

  app.get('/get/query', function(req, res) {
    res.json(req.query);
  });

  app.get('/get/header', function(req, res) {
    res.json(req.headers);
  });

  app.post('/post/header', function(req, res) {
    res.json(req.headers);
  });

  app.post('/post/param', function(req, res) {
    res.json(req.body);
  });

  app.post('/post/formdata', upload.array(), function(req, res) {
    res.json(req.body);
  });
}

server.port = 3001;

module.exports = server;
