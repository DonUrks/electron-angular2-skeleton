/// <reference path="typings/index.d.ts" />
import electron = require("electron");
let app = electron.app;
let BrowserWindow = electron.BrowserWindow;

// Global reference to the main window, so the garbage collector doesn't close it.
let mainWindow : Electron.BrowserWindow;

// Opens the main window, with a native menu bar.
function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Call 'createWindow()' on startup.
app.on("ready", () => {
  createWindow();
  mainWindow.webContents.on("did-finish-load", () => {
      // Sending a message to the renderer process
      mainWindow.webContents.send("send-alert", "This is a message from the main process (main.ts)");
  });
});

// On OS X it is common for applications and their menu bar to stay active until the user quits explicitly
// with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
});

// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other
// windows open.
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});