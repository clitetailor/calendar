const path = require('path');
const electron = require('electron');

const ipc = electron.ipcMain;
const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow;

let { schedule, nextNote } = require("./main/schedule.js");
let { getNotes } = require("./main/file-system.js");

let appIcon = null;

let win;
let startScr;

require('electron-reload')(__dirname);


function createWindow() {
	win = new BrowserWindow({ width: 1200, height: 720 })
	win.loadURL(`file://${__dirname}/index.html`)

	win.webContents.openDevTools();

	win.on('closed', () => {

	});
}

function putInTray() {
	const iconName = './icon.png';
	const iconPath = path.resolve(iconName);
	appIcon = new Tray(iconPath)

	function removeTrayIcon() {
		appIcon.destroy();
	}

	function quit() {
		appIcon.destroy();
		app.quit();
	}

	const template = [{
		label: 'Open',
		click: createWindow
	}, {
		label: 'Remove tray icon',
		click: removeTrayIcon
	}, {
		label: 'Quit',
		click: quit
	}]

	const contextMenu = Menu.buildFromTemplate(template);
	appIcon.setToolTip('Hello! Have a nice day!')
	appIcon.setContextMenu(contextMenu)
}


app.on('ready', () => {
	createWindow()
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		if (appIcon) {
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



let timeoutId;

ipc.on('usr-data', function () {
	getNotes().then(notes => {
		schedule(timeoutId, nextNote(notes).title);
	}).catch((err) => {
		console.log(err);
	})
})