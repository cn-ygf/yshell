/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// tab list
var g_tab_list = new Array()

// create tab
function create_tab(options, dom_id) {
    var content_dom = document.getElementById('right-content-page')
    content_dom.appendChild(options.bindview)
    var tablist = document.getElementById('tablist')
    var item_dom = document.createElement('div')
    item_dom.classList.add('hosts-ico')
    item_dom.classList.add('tableitem')
    item_dom.isSelected = false
    if (options.selected) {
        item_dom.classList.add('tableitem-selected')
        item_dom.isSelected = true
    }
    var item_html = '<span>'
    item_html = item_html + options.title
    item_html = item_html + '</span><div style="display:inline-block;padding-left: 10px;"><a class="tablist-close show-close" title="关闭（Ctrl+F4）"></a></div>'
    item_dom.innerHTML = item_html
    item_dom.onmouseover = function() {
        item_dom.classList.add('tableitem-selected-ex')
    }
    item_dom.onmouseout = function() {
        item_dom.classList.remove('tableitem-selected-ex')
    }
    item_dom.onclick = function() {
        clear_all_select()
        item_dom.classList.add('tableitem-selected')
        options.bindview.style.display = 'block'
    }
    item_dom.getElementsByTagName('a')[0].onclick = function() {
        tablist.removeChild(item_dom)
        content_dom.removeChild(options.bindview)
        remove_child(item_dom)
    }
    clear_all_select()
    tablist.appendChild(item_dom)
    g_tab_list.push({
        'tab': item_dom,
        'view': options.bindview
    })
}

function clear_all_select() {
    for (var i = 0; i < g_tab_list.length; i++) {
        g_tab_list[i].tab.classList.remove('tableitem-selected')
        g_tab_list[i].view.style.display = 'none'
    }
}

function remove_child(tab) {
    for (var i = 0; i < g_tab_list.length; i++) {
        if (g_tab_list[i].tab == tab) {
            g_tab_list.splice(i, 1)
            break
        }
    }
}