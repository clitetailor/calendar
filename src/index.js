const path = require('path');
const electron = require('electron');

const ipc = electron.ipcMain;
const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow;

let appIcon = null;

let win;
let startScr;

function createWindow() {
	if (BrowserWindow.getAllWindows().length > 0) {
		win.focus();
		return;
	} 
	win = new BrowserWindow({ width: 1200, height: 720 })
	win.loadURL(`file://${__dirname}/index.html`)

	win.setMenu(null);

	win.on('closed', () => {

	});
}

app.on('ready', () => {
	createWindow()
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		if (!appIcon) {
			app.quit();
		}
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
})

ipc.on('remove-tray', function () {
	appIcon.destroy();
})

app.on('window-all-closed', function () {

})



var timeoutId;