const { app, BrowserWindow } = require("electron");
const localShortcut = require("electron-localshortcut");

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
    },
  });
  function sendKeybinding(win, keyCode, modifiers) {
    localShortcut.unregisterAll(win);
    win.webContents.sendInputEvent({
      type: "keyDown",
      modifiers: modifiers,
      keyCode: keyCode,
    });
    win.webContents.sendInputEvent({
      type: "char",
      modifiers: modifiers,
      keyCode: keyCode,
    });
    win.webContents.sendInputEvent({
      type: "keyUp",
      modifiers: modifiers,
      keyCode: keyCode,
    });
    bindall();
  }

  win.setMenu(null);
  win.loadURL("https://browser.remoteworks.jp/");

  function bindall() {
    localShortcut.register(win, "Alt+F4", () => {
      sendKeybinding(win, "F4", ["Alt"]);
    });
    localShortcut.register(win, "CmdOrCtrl+W", () => {
      sendKeybinding(win, "W", ["Ctrl"]);
    });
    localShortcut.register(win, "CmdOrCtrl+R", (e) => {
      sendKeybinding(win, "R", ["Ctrl"]);
    });
    localShortcut.register(win, "Escape", (e) => {
      sendKeybinding(win, "Escape ", []);
    });
    localShortcut.register(win, "F11", (e) => {
      sendKeybinding(win, "F11 ", []);
    });
    localShortcut.register(win, "Super+D", () => {
      // can't capture
    });
    localShortcut.register(win, "Alt+Tab", () => {
      // can't control
    });
  }
  bindall();
}

app.whenReady().then(createWindow);
