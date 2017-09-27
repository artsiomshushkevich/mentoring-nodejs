'use strict';

import * as fs from 'fs';
import * as pathResolver from 'path';
import {EventEmitter} from 'events';

export default class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.intervalTimeout = null;
        this.dirSize = null;
    }

    watch(path, delay) {
        let intervalCallback = () => {
           try {
                let files = fs.readdirSync(path, 'utf8');
                let newDirSize = 0;
                
                for (let i = 0; i < files.length; i++) {
                    newDirSize += fs.statSync(pathResolver.join(path, files[i])).size;
                }
    
                if (this.dirSize !== null && this.dirSize !== newDirSize) {
                    this.emit('dirwatcher:changed');
                }

                console.log ('old value %d new value', this.dirSize, newDirSize);
                this.dirSize = newDirSize;
                
            } catch (error) {
                this.unwatch();
            }
            
        };

        this.intervalTimeout = setInterval(intervalCallback, delay, path);
    }

    unwatch() {
        clearInterval(this.intervalTimeout);
    }
}