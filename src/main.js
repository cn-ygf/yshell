/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
const storage = require('electron-json-storage');

// main window
let win

// param
var g_param = new Object()
g_param.isshowsessionmgr = false

// create main window
function createWindow() {
    app.setAppUserModelId('net.cnygf.yshell')
        // read config
    storage.get('config', function(err, config) {
        win = new BrowserWindow({ width: config.width, height: config.height, frame: false, resizable: true, show: false })
        win.loadFile('./src/ys/window/index.html')
        win.setBackgroundColor('#1E1E1E')
        win.setTitle('YShell by YGF')
        win.setIcon('./src/ys/window/logo.png')
        win.setOverlayIcon('./src/ys/window/logo.png', 'Description for overlay')
        win.on('ready-to-show', () => {
            if (config.ismax) {
                win.maximize()
            } else {
                win.webContents.send('on_resize', win.getContentSize())
            }
            if (config.isshowsessionmgr) {
                win.webContents.send('on_show_session_mgr')
            }
            win.show()
        })

        win.on('closed', () => {
            win = null
        })

        win.on('maximize', () => {
            win.webContents.send('on_max')
        })

        win.on('unmaximize', () => {
            win.webContents.send('on_restore')
        })

        win.on('resize', () => {
            win.webContents.send('on_resize', win.getContentSize())
        })
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('browser-window-blur', () => {
    win.webContents.send('on_window_blur')
})

app.on('browser-window-focus', () => {
    win.webContents.send('on_window_focus')
})

ipc.on('on_btn_close', () => {
    save_config()
    win.close()
})

ipc.on('on_btn_min', () => {
    win.minimize()
})

ipc.on('on_btn_max', () => {
    win.maximize()
})

ipc.on('on_btn_restore', () => {
    win.unmaximize()
})

ipc.on('on_menu_btn_dev', () => {
    win.webContents.openDevTools()
})

ipc.on('on_menu_btn_about', () => {
    const options = {
        type: 'info',
        title: 'YShell SSH Client',
        message: '版本：1.0.1\r\n作者：YGF\r\n邮箱：ygf@cnhonker.com',
        buttons: ['确定'],
    }
    dialog.showMessageBox(win, options, function(index) {})
})

ipc.on('on_menu_btn_exit', () => {
    save_config()
    win.close()
})

ipc.on('on_session_mgr_opend', (event, args) => {
    g_param.isshowsessionmgr = args
})

//save config
function save_config() {
    var size = win.getSize()
    var isMaximized = win.isMaximized()
    storage.get('config', function(err, config) {
        if (isMaximized) {
            if (err) {
                size[0] = 900
                size[1] = 500
            } else {
                size[0] = config.width
                size[1] = config.height
            }
        }
        storage.set('config', {
            width: size[0],
            height: size[1],
            ismax: isMaximized,
            isshowsessionmgr: g_param.isshowsessionmgr
        })
    })
}