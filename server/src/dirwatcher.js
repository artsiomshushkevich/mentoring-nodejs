'use strict';

import fs from 'fs';
import pathResolver from 'path';
import EventEmitter from 'events';

export default class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this._intervalTimeout = null;
        this._dirSize = null;
    }

    watch(path, delay) {
        let intervalCallback = () => {
           try {
                let files = fs.readdirSync(path, 'utf8');
                let newDirSize = 0;
                
                files.forEach(function(file) {
                    newDirSize += fs.statSync(pathResolver.join(path, file)).size;
                }); 
            
                if (this._dirSize !== null && this._dirSize !== newDirSize) {
                    this.emit('dirwatcher:changed');
                }

                this._dirSize = newDirSize;
            } catch (error) {
                console.log(error.message);
                this.unwatch();
            } 
        };

        this._intervalTimeout = setInterval(intervalCallback, delay, path);
        return this;
    }

    unwatch() {
        clearInterval(this._intervalTimeout);
    }
}