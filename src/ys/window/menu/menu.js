/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// menu list
var g_menu_list = new Array()

// hide flag
var g_hide_flag = false

// menu bar clicked
var g_menu_bar_clicked = false

// create menu
function create_menu(menu_option, dom_id) {
    var bind_dom = document.getElementById(dom_id)
    var x = bind_dom.offsetLeft
    var menu_html = '<div style="padding-top: 6px;padding-bottom: 6px;"><ul>'
    for (var i = 0; i < menu_option.length; i++) {
        var menu_item = menu_option[i]
        var html_item = '<li '
        if (typeof(menu_item.click) != 'undefined') {
            html_item = html_item + 'onclick="' + menu_item.click + '"'
        }
        html_item = html_item + '><span>'
        html_item = html_item + menu_item.label
        html_item = html_item + '</span>'
        if (typeof(menu_item.key) != 'undefined') {
            html_item = html_item + '<span style="font-size: inherit;float:right;">'
            html_item = html_item + menu_item.key
            html_item = html_item + '</span>'
        }
        html_item = html_item + '</a>'
        menu_html = menu_html + html_item
    }
    menu_html = menu_html + '</ul></div>'
    var menu_div = document.createElement('div')
    menu_div.style.left = x + 'px';
    menu_div.classList.add('menu')
    menu_div.innerHTML = menu_html
    menu_div.isShowMenu = false
    var show_menu = function() {
        if (!menu_div.isShowMenu) {
            hide_all_menu()
            menu_div.style.display = 'inline-block'
            menu_div.isShowMenu = true
            g_menu_bar_clicked = true
        } else {
            menu_div.style.display = 'none'
            menu_div.isShowMenu = false
        }
    }
    bind_dom.onclick = show_menu
    menu_div.onmouseover = function() {
        g_hide_flag = true
    }
    menu_div.onmouseup = function() {
        g_hide_flag = false
    }
    menu_div.onclick = function() {
        g_menu_bar_clicked = false
        hide_all_menu()
    }
    bind_dom.onmouseover = function() {
        if (g_menu_bar_clicked) {
            hide_all_menu()
            menu_div.style.display = 'inline-block'
            menu_div.isShowMenu = true
        }
    }
    document.body.appendChild(menu_div)
    g_menu_list.push(menu_div)
}

// hide all menu
function hide_all_menu() {
    for (var i = 0; i < g_menu_list.length; i++) {
        g_menu_list[i].style.display = 'none'
        g_menu_list[i].isShowMenu = false
    }
}

document.body.onclick = function() {
    if (g_hide_flag) {
        g_menu_bar_clicked = false
        hide_all_menu()
        g_hide_flag = false
    }
}