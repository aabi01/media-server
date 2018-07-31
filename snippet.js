#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var xmltojson = require('xml2json');
var path = require('path');
var files = require('./lib/files');

var mpd2json = require('./lib/mpd2json');

    program
      .arguments('<fileName>')
      .action(function(fileName) {
        console.log('file: %s', fileName);

        // Get MPD File
        const MPDFilePath = path.join(__dirname, fileName);
        const MPDFileName = path.basename(fileName, '.mpd');
        const MPDFileFolder = path.dirname(MPDFilePath);

        console.log('filePath: %s', MPDFilePath);
        console.log('fileName: %s', MPDFileName);
        console.log('fileFolder: %s', MPDFileFolder);

        console.log('currentDirectory', files.getCurrentDirectoryBase());
        console.log('directoryExists', files.directoryExists(MPDFilePath));

        console.log('---------------');
        console.log('---------------');

        fs.readFile(MPDFilePath, (err, data) => {
          fs.writeFile(MPDFileFolder+'/test-'+MPDFileName+'.json', xmltojson.toJson(data), function (err) {
            if (err) throw err;
              console.log('Saved!');
            });
        });

      })
      .parse(process.argv);