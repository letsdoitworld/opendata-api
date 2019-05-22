require('dotenv').config();
const express = require('express');
const mountRoutes = require('./api/routes');
const helmet = require('helmet');
const trashoutImporter = require('./api/reportImporter/importer');

const app = express();
app.use(helmet());

const compression = require('compression');

app.use(compression());

mountRoutes(app);

const port = process.env.PORT || 3000;
const intf = process.env.INTERFACE || '127.0.0.1';

app.listen(port, intf);

console.log(`API server started on: ${intf} and port ${port}`);

trashoutImporter.updateReportsDaily();
console.log('Started Trashout integration');

//
//
// require('dotenv').config();
// const express = require('express');
// const mountRoutes = require('./api/routes');
// const helmet = require('helmet');
// const trashoutImporter = require('./api/reportImporter/importer');
// var https = require('https');
// var fs = require('fs');
//
// const app = express();
// app.use(helmet());
//
// const compression = require('compression');
// app.use(compression());
//
// mountRoutes(app);
//
// const port = process.env.PORT || 3000;
// const intf = process.env.INTERFACE || '0.0.0.0';
//
// var options = {
//     key: fs.readFileSync('ssl/server-key.pem'),
//     cert: fs.readFileSync('ssl/server-crt.pem'),
//     ca: fs.readFileSync('ssl/ca-crt.pem'),
//     requestCert: false,
//     rejectUnauthorized: false
// };
//
//
// var server = https.createServer(options, app).listen(port, function(){
//     console.log("SSL server started at port " + port);
// });
//
// //app.listen(port, intf);
//
// //console.log('API server started on: ' + port);
//
// trashoutImporter.updateReportsDaily();
// console.log('Started Trashout integration');
