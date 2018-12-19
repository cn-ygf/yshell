/*---------------------------------------------------------------------------------------------
 *  Copyright (c) YGF. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const SSHClient = require('ssh2').Client

// create a ssh connect
function create_ssh_connect(option) {
    var domview = option.domview
    var domtext = document.createElement('textarea')
    domtext.classList.add('terminal')
    domtext.classList.add('terminal-bg')
    domview.appendChild(domtext)
    var conn = new SSHClient()
    conn.on('ready', function() {
        conn.shell(function(err, stream) {
            if (err) throw err
            stream.on('close', function() {
                console.log('stream::close')
                conn.end()
            }).on('data', function(data) {
                domtext.innerHTML = domtext.innerHTML + data
                console.log('STDOUT: ' + data);
            }).stderr.on('data', function(data) {
                console.log('STDERR: ' + data);
            })
            stream.end('top\n')
        })
    }).connect({
        host: '192.168.3.131',
        port: 22,
        username: 'root',
        password: 'root'
    })
}