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
const intf = process.env.INTERFACE || '0.0.0.0';
app.listen(port, intf);

console.log('API server started on: ' + port);

trashoutImporter.updateReportsDaily();
console.log('Started Trashout integration');

