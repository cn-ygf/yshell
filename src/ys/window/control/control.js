/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function UIControl() {
    this.name = 'myname'
    this.say = function() {
        return 'sayhello'
    }
}

exports.UIControl = UIControl