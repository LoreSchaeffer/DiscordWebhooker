const { app, BrowserWindow } = require('electron');
const path = require('path');

const DEV_TOOLS = true;

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
