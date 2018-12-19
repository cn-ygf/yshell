/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const storage = require('electron-json-storage');

module.exports = {
    // save window size
    save_window_size: function(size) {
        storage.set('size', { width: size[0], height: size[1] })
    },
    get_window_size: function() {
        storage.get('size', )
    }
}