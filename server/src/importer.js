'use strict';

import DirWatcher from './dirwatcher';
import fs from 'fs';
import pathResolver from 'path';
import Papa from 'papaparse';
import promisify from 'util.promisify';

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);

export default class Importer {
    constructor(dirWatcher) {
        this._dirWatcher = dirWatcher;
    }

    importSync(path) {
        let files = fs.readdirSync(path, 'utf8');
        
        let resultArrayOfFilesEntries = files.map((file) => {
            let fileContent = fs.readFileSync(pathResolver.join(path, file));
            return Papa.parse(fileContent.toString()).data;
        });
    
        return JSON.stringify(resultArrayOfFilesEntries);
    }

    import(path) {
        return readdirAsync(path)
            .then((files) => {
                let readFileAsyncPromises = files.map((file) => {
                    return readFileAsync(pathResolver.join(path, file));
                });

                return Promise.all(readFileAsyncPromises);
            })
            .then((fileContents) => {
                var resultArrayOfFilesEntries = fileContents.map((fileContent) => {
                    return Papa.parse(fileContent.toString()).data;
                });

                return JSON.stringify(resultArrayOfFilesEntries);
            });
    }

    get dirWatcher() {
        return this._dirWatcher || new DirWatcher();
    }

    set dirWatcher(dirwatcher) {
        this._dirWatcher = dirWatcher;
    }
}