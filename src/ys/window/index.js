/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// ipc service
const ipc = require('electron').ipcRenderer
const fs = require('fs');

// Close button click event
function on_btn_close() {
    ipc.send('on_btn_close')
}

// Minimize button click event
function on_btn_min() {
    ipc.send('on_btn_min')
}

// Max button click event
function on_btn_max() {
    ipc.send('on_btn_max')
}

// Restore button click event
function on_btn_restore() {
    ipc.send('on_btn_restore')
}

// -----------------------------------------------------------------------------------------------------------
// 最大化事件
// -----------------------------------------------------------------------------------------------------------
ipc.on('on_max', () => {
    var btn_max = document.getElementById('sys_max')
    var btn_restore = document.getElementById('sys_restore')
    btn_max.style.display = 'none'
    btn_restore.style.display = 'block'
})

// -----------------------------------------------------------------------------------------------------------
// 最小化事件
// -----------------------------------------------------------------------------------------------------------
ipc.on('on_restore', () => {
    var btn_max = document.getElementById('sys_max')
    var btn_restore = document.getElementById('sys_restore')
    btn_max.style.display = 'block'
    btn_restore.style.display = 'none'
})

// Window size changed
ipc.on('on_resize', (event, args) => {
    var statusbar = document.getElementById("statusbar")
    statusbar.style.top = (args[1] - 22) + "px"
})

//Show left session mgr
ipc.on('on_show_session_mgr', (event, args) => {
    open_session_mgr()
})

// create menu
function menu_init() {
    var help_option = [{
        label: '新建',
        key: 'Ctrl+N'
    }, {
        label: '打开',
        key: 'Ctrl+O'
    }, {
        label: '断开'
    }, {
        label: '重新连接',
        key: 'Ctrl+R'
    }, {
        label: '打印'
    }, {
        label: '退出',
        click: 'menu_exit()'
    }]
    create_menu(help_option, 'menu_file')
    var help_option = [{
        label: '复制',
        key: 'Ctrl+Shift+C'
    }, {
        label: '粘贴',
        key: 'Ctrl+Shift+P'
    }, {
        label: '全选',
        key: 'Ctrl+Shift+A'
    }, {
        label: '查找',
        key: 'Ctrl+F'
    }, {
        label: '清屏'
    }]
    create_menu(help_option, 'menu_edit')
    var help_option = [{
        label: '选项 ...'
    }]
    create_menu(help_option, 'menu_tools')
    var help_option = [{
        label: '欢迎使用',
        click: 'menu_load_welcome_page()'
    }, {
        label: '切换开发人员工具',
        click: 'menu_open_dev()'
    }, {
        label: '关于...',
        click: 'menu_open_about()'
    }]
    create_menu(help_option, 'menu_help')
}
menu_init()

// open dev tools
function menu_open_dev() {
    ipc.send('on_menu_btn_dev')
}

// about
function menu_open_about() {
    ipc.send('on_menu_btn_about')
}

// exit
function menu_exit() {
    ipc.send('on_menu_btn_exit')
}

// open welcome page
function menu_load_welcome_page() {
    load_page('欢迎使用', './src/ys/window/page/welcome.html')
}

// open session manager
function open_session_mgr() {
    var smgr_dom = document.getElementById('session_mgr')
    var content_dom = document.getElementById('right-content')
    var open_btn = document.getElementById('left-explore')
    if (smgr_dom.style.display == 'none') {
        smgr_dom.style.display = 'block'
        content_dom.style.left = '350px'
        open_btn.classList.add('checked')
        ipc.send('on_session_mgr_opend', true)
    } else {
        smgr_dom.style.display = 'none'
        content_dom.style.left = '50px'
        open_btn.classList.remove('checked')
        ipc.send('on_session_mgr_opend', false)
    }
}

// load page
function load_page(title, path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        var page_dom = document.createElement('div')
        page_dom.classList.add('terminal')
        page_dom.innerHTML = data
        create_tab({ title: title, selected: true, bindview: page_dom })
    })
}


function open_terminal_page() {
    var page_dom = document.createElement('div')
    page_dom.classList.add('terminal')
    create_tab({ title: 'root@1fasdfasdf7', selected: true, bindview: page_dom })
    create_ssh_connect({
        host: '119.fasdf.fasdfa.fasdf',
        port: 22,
        username: 'root',
        password: 'fasdfasdf',
        domview: page_dom
    })
}

// drop
function init_left_vertical() {
    var smgr_dom = document.getElementById('session_mgr')
    var content_dom = document.getElementById('right-content')
    var dom = document.getElementById('left-vertical')
    var right_dom = document.getElementById('right-content')
    var mousemove = function(event) {
        var mtr_width = event.pageX - 50
        smgr_dom.style.width = mtr_width + 'px'
        right_dom.style.left = event.pageX + 'px'
        dom.style.left = (event.pageX - 54) + 'px'
    }
    dom.addEventListener('mousedown', function(event) {
        document.addEventListener('mouseup', function(event) {
            document.removeEventListener('mousemove', mousemove);
        });
        document.addEventListener('mousemove', mousemove);

    })
}

init_left_vertical()

function init_data() {
    menu_load_welcome_page()
    open_terminal_page()
}

init_data()