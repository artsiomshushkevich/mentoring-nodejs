'use strict';

import DirWatcher from './dirwatcher';
import * as fs from 'fs';
import * as pathResolver from 'path'
import * as Papa from 'papaparse';

export default class Importer {
    constructor(dirWatcher) {
        this._dirWatcher = dirWatcher;
    }

    importSync(path) {
        let resultArrayOfFilesEntries = [];
        let files = fs.readdirSync(path, 'utf8');
        
        files.forEach((file) => {
            let fileContent = fs.readFileSync(pathResolver.join(path, file));
            let parsedData = Papa.parse(fileContent.toString());
            
            resultArrayOfFilesEntries.push({
                file: file,
                entries: parsedData.data
            });
        });
    
        return JSON.stringify(resultArrayOfFilesEntries);
    }

    import(path) {

    }

    get dirWatcher() {
        return this._dirWatcher ? this._dirWatcher : new DirWatcher();
    }

    set dirWatcher(dirwatcher) {
        this._dirWatcher = dirWatcher;
    }
}