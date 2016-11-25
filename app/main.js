const path = require('path');
const electron = require('electron');

const ipc = electron.ipcMain;
const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow;

const storage = require('./storage.js')
const getNotes = storage.getNotes;
const addNote = storage.addNotes;

let appIcon = null;


let win;
let startScr;

require('electron-reload')(__dirname);


function createWindow ()
{	
	win = new BrowserWindow({width: 1200, height: 720})
	win.loadURL(`file://${__dirname}/index.html`)

	win.webContents.openDevTools();

	win.on('closed', () => {
		
	});
}


function createStartScr() {
	startScr = new BrowserWindow({width: 256, height: 256, frame: false})
	startScr.loadURL(`file://${__dirname}/calendar.png`)
}

function putInTray() {
	const iconName = './app/calendar.png';
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
	},{
		label: 'Remove tray icon',
		click: removeTrayIcon
	},{
		label: 'Quit',
		click: quit
	}]

	const contextMenu = Menu.buildFromTemplate(template);
	appIcon.setToolTip('Hello! Have a nice day!')
	appIcon.setContextMenu(contextMenu)
}


app.on('ready', () => {
	putInTray()
	createStartScr()
	setTimeout(() => {
		createWindow();
		startScr.close();
	}, 1000);
});

app.on('window-all-closed', () =>
{
	if (process.platform !== 'darwin')
	{
		if (appIcon) {
			app.quit();
		}
	}
})

app.on('activate', () =>
{
	if (win === null)
	{
		createWindow();
	}
})

ipc.on('remove-tray', function () {
  appIcon.destroy();
})

app.on('window-all-closed', function () {
	
})

ipc.on('get-notes', function (event) {
	getNotes().then(docs => event.sender.send('notes-reply', docs));
})

ipc.on('add-note', function(event) {
	addNote(event)
})