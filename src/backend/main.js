const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;

const DEV_TOOLS = false;
let mainWin;
let modal;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const win = new BrowserWindow({
    icon: 'icon.png',
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    frame: true,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('src/index.html');

  win.once('ready-to-show', () => {
    win.show();
    if (DEV_TOOLS) win.webContents.openDevTools();
  });

  mainWin = win;
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipc.on('add_webhook', () => {
  const win = new BrowserWindow({
    icon: 'icon.png',
    width: 600,
    height: 200,
    minWidth: 600,
    minHeight: 200,
    frame: true,
    autoHideMenuBar: true,
    parent: mainWin,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('src/add_webhook.html');

  win.once('ready-to-show', () => {
    win.show();
    if (DEV_TOOLS) win.webContents.openDevTools();
  });

  modal = win;
});

ipc.on('close_modal', () => {
    modal.close();
});

ipc.on('new_webhook', (e, args) => {
  console.log("Args:" + args);
});