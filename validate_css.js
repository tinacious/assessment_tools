'use strict';

const fs = require('fs');
const path = require('path');

const argv = require('yargs').argv;
const validate = require('css-validator');

// Path required
let projectSourceDir = argv.path;
if (!projectSourceDir) {
    throw new Error('--path=/path/to/dir is required');
}


let filteredFilepaths = [];

const fromDir = (startPath, filter) => {
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    let files = fs.readdirSync(startPath);

    files.forEach((file, i) => {
        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            fromDir(filename, filter);
        } else if (filename.indexOf(filter) >=0) {
            filteredFilepaths.push(filename);
        }
    });
};

// Get all paths to the CSS files
fromDir(projectSourceDir, '.css');

// Iterate over files
filteredFilepaths
.filter(file => file.indexOf('reset') === -1 && file.indexOf('normalize') === -1)
.forEach((file, index) => {
    const css = fs.readFileSync(file).toString(); // ok
    const fileArr = file.split('/');
    const filename = fileArr[fileArr.length - 2]; // ok

    // Validate
    validate({text: css, wc3url: 'http://www.css-validator.org/validator'}, (err, data) => {
        if (err) {
            throw err;
        }

        // TODO: this when jigsaw isn't broken
        console.log(`Doing file at index ${index}`);

        const isValid = data.validity;
        const errors = data.errors;
        const warnings = data.warnings;

        console.log('-----------');
        console.log('-----is valid?------', isValid);

        console.log('-----errors------');
        console.log(errors);

        console.log('-----warnings------');
        console.log(warnings);

        // Write results
    });
});
