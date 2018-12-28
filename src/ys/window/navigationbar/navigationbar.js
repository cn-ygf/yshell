/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

function UINavigationBar(options) {
    this.main_div = document.createElement('div')
    this.main_div.classList.add('navigationbar')
    this.main_div.style.backgroundColor = options.backgroundColor
    this.main_div.style.width = options.width
    this.show = function() {
        document.body.appendChild(this.main_div)
    }
    this.hide = function() {
        document.body.removeChild(this.main_div)
    }
}


exports.UINavigationBar = UINavigationBar