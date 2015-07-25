'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');

require('crash-reporter').start();

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function() {
    // メニューをアプリケーションに追加
    Menu.setApplicationMenu(menu);

    openWindow(process.cwd());
});

function openWindow (baseDir) {
    var win = new BrowserWindow({width: 800, height: 600});
    win.loadUrl('file://' + __dirname + '/index.html?baseDir=' + encodeURIComponent(baseDir));
    win.on('closed', function () {
        win = null;
    });
}

// メニュー情報の作成
var template = [
      {
          label: 'ReadUs',
          submenu: [
                    {label:'Quit',accelerator:'Command+Q', click: function () {app.quit();}}
          ]
      }, {
          label: 'File',
          submenu: [
              {label: 'Open', accelerator: 'Command+O', click: function() {
                  // 「ファイルを開く」ダイアログの呼び出し
                  require('dialog').showOpenDialog({ properties: ['openDirectory']}, function (baseDir){
                      if(baseDir && baseDir[0]) {
                          openWindow(baseDir[0]);
                      }
                  });
              }}
          ]
      }, {
          label: 'View',
          submenu: [
              {label: 'Reload', accelerator: 'Command+R', click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); } },
              { label: 'Toggle DevTools', accelerator: 'Alt+Command+I', click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); } }
          ]
      }
];

var menu = Menu.buildFromTemplate(template);
