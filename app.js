const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const xml2jsonPackage = require('xml2json');
const xmlJS = require('xml-js');

const config = {
  escapeMode: false,
  attributePrefix: '',
  arrayAccessForm: 'property',
  emptyNodeForm: 'object',
  stripWhitespaces: false,
  enableToStringFunc: false,
  ignoreRoot: true
}
const xml2jsonLocal = require('./externals/xml2json');

const mylibrary = require('./externals/mylibrary');

const app = express();
//const port = process.env.PORT || 3000;
const port = 4000;

app.use(cors());

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// app.use('/video', express.static(path.join(__dirname, '/public/video')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Media Server'
    }
  );
});

/**
 * Wildcard Route
 */
app.get(/.*.json$/, (req, res) => {
  const orginalUrl = req.originalUrl;
  const FileName = path.parse(orginalUrl).name + '.mpd';

  // Get MPD File
  const MPDFilePath = path.join(__dirname, '/public/video/', FileName);

  fs.readFile(MPDFilePath, (err, data) => {
    const jsonObj = xml2jsonPackage.toJson(data);
    res.send(jsonObj);
  });

});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
