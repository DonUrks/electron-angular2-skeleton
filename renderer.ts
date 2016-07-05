/// <reference path="typings/index.d.ts" />
import electron = require("electron");
let ipcRenderer = electron.ipcRenderer;

// Waiting for a "send-alert" event from the main process and showing the message
ipcRenderer.on("send-alert", (event, arg) => {
  alert(arg);
});