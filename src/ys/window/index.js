/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// ipc service
const ipc = require('electron').ipcRenderer
const UITitleBar = require('./titlebar/titlebar').UITitleBar
const UIMenuBar = require('./control/menu/menu').UIMenuBar
const UISysButton = require('./sysbutton/sysbutton').UISysButton
const UINavigationBar = require('./navigationbar/navigationbar').UINavigationBar
const UIStateBar = require('./statebar/statebar').UIStateBar
const UIPanel = require('./panel/panel').UIPanel

/*---------------------------------------------------------------------------------------------
 * Init window layout
 *--------------------------------------------------------------------------------------------*/
let titlebar
let navigationbar
let statebar
let panel

// init title bar
function init_title_bar() {
    var options = {}
    options.title = '欢迎使用 - YShell'
    options.color = 'rgb(204,204,204)'
    options.backgroundColor = 'rgb(60,60,60)'
    options.icon = 'url(./titlebar/icon.svg)'
    options.height = '30px'
    var menu_options = [{
        label: '文件(F)',
        items: [{
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
            click: function() {
                ipc.send('on_menu_btn_exit')
            }
        }]
    }, {
        label: '编辑(E)',
        items: [{
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
    }, {
        label: '工具(T)'
    }, {
        label: '选项卡(B)',
        items: [{
            label: '选项 ...'
        }]
    }, {
        label: '窗口(W)'
    }, {
        label: '帮助(H)',
        items: [{
            label: '欢迎使用',
            click: function() {}
        }, {
            label: '切换开发人员工具',
            click: function() {
                ipc.send('on_menu_btn_dev')
            }
        }, {
            label: '关于...',
            click: function() {
                ipc.send('on_menu_btn_about')
            }
        }]
    }]
    options.menu_bar = new UIMenuBar(menu_options)
    options.sys_button = new UISysButton()

    titlebar = new UITitleBar(options)
    titlebar.show()
}

// init navigationbar
function init_navigation_bar() {
    var options = {}
    options.backgroundColor = 'rgb(51,51,51)'
    options.width = '50px'
    options.items = [{
        title: '会话管理器',
        image: 'url(./navigationbar/smg.svg) no-repeat 50% 50%',
        click: function() {}
    }, {
        title: '测试',
        image: 'url(./navigationbar/so.svg) no-repeat 50% 50%',
        click: function() {}
    }, {
        title: '设置',
        image: 'url(./navigationbar/setting.svg) no-repeat 50% 50%',
        click: function() {},
        align: 'bottom'
    }]
    navigationbar = new UINavigationBar(options)
    navigationbar.show()
    navigationbar.setSelected(0)
}

//init statebar
function init_state_bar() {
    var options = {}
    options.backgroundColor = 'rgb(0,122,204)'
    options.color = 'rgb(255,255,255)'
    options.height = '22'
    statebar = new UIStateBar(options)
    statebar.show()
}

//init panel
function init_panel() {
    var options = {}
    panel = new UIPanel(options)
    panel.show()
}

init_title_bar()
init_navigation_bar()
init_state_bar()
init_panel()


// window lose focus
ipc.on('on_window_blur', () => {
    titlebar.setBackgroundColor('rgb(51,51,51)')
})

// window get focus
ipc.on('on_window_focus', () => {
    titlebar.setBackgroundColor('rgb(60,60,60)')
})

// Window size changed
ipc.on('on_resize', (event, args) => {
    statebar.setTop(args[1])
})