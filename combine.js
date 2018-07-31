#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var xmltojson = require('xml2json');
var path = require('path');
var files = require('./lib/files');

var mpd2json = require('./lib/mpd2json');

    program
      .arguments('<fileName1> <fileName2>')
      .action(function(fileName1, fileName2) {
        console.log('file 1 : %s', fileName1);
        console.log('file 2 : %s', fileName2);
        console.log('---------------');

        // Get File Paths
        const file1_path = path.join(__dirname, fileName1);
        const file2_path = path.join(__dirname, fileName2);
        console.log('file 1 path: %s', file1_path);
        console.log('file 2 path: %s', file2_path);

        const folder_path = path.dirname(file1_path);
        console.log('folder path: %s', folder_path);

        // Get MPD File
        // const MPDFilePath = path.join(__dirname, fileName);
        // const MPDFileName = path.basename(fileName, '.mpd');
        // const MPDFileFolder = path.dirname(MPDFilePath);
        //
        // console.log('filePath: %s', MPDFilePath);
        // console.log('fileName: %s', MPDFileName);
        // console.log('fileFolder: %s', MPDFileFolder);
        //
        // console.log('currentDirectory', files.getCurrentDirectoryBase());
        // console.log('directoryExists', files.directoryExists(MPDFilePath));

        console.log('---------------');
        console.log('---------------');

        var finalJSON = {};

        var file1_data = '';

        fs.readFile(file1_path, "UTF8", function(err, data) {
          if (err) { throw err };
          finalJSON['dash'] = data;
        });

        fs.readFile(file2_path, "UTF8", function(err, data) {
          if (err) { throw err };
          finalJSON['hls'] = data;
        });


        setTimeout(function () {
          console.log('finalJSON: ', finalJSON);

          fs.writeFile(folder_path+'/testfile.json', finalJSON, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });

        }, 5000);

      })
      .parse(process.argv);