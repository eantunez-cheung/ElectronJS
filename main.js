const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        }
    })
    console.log(path.join(__dirname, 'preload.js'))
    win.loadFile('View/index.html')

    ipcMain.on('set-title', (event, title) => {
        console.log(title)
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(title)
      })

    // const menu = Menu.buildFromTemplate([
    //     {
    //         label: 'Fichier',
    //         submenu: [
    //             {
    //                 label: 'Ouvrir',
    //                 accelerator: 'CmdOrCtrl+O',
    //                 click: async () => {
    //                     const result = await dialog.showOpenDialog({
    //                         properties: ['openFile'],
    //                         filters: [
    //                             { name: 'Text Files', extensions: ['txt'] },
    //                             { name: 'All Files', extensions: ['*'] }
    //                         ]
    //                     });

    //                     if (!result.canceled) {
    //                         console.log('Fichier sélectionné :', result.filePaths[0]);
    //                     }
    //                 }
    //             },
    //             {
    //                 label: 'Quitter',
    //                 accelerator: 'CmdOrCtrl+Q',
    //                 click: () => {
    //                     app.quit()
    //                 }
    //             }
    //         ]
    //     },
    //     {
    //         label: 'Edition',
    //         submenu: [
    //             {
    //                 label: 'Annuler',
    //                 accelerator: 'CmdOrCtrl+Z',
    //                 role: 'undo'
    //             },
    //             {
    //                 label: 'Refaire',
    //                 accelerator: 'CmdOrCtrl+Y',
    //                 role: 'redo'
    //             },
    //             { type: 'separator' },
    //             {
    //                 label: 'Couper',
    //                 accelerator: 'CmdOrCtrl+X',
    //                 role: 'cut'
    //             },
    //             {
    //                 label: 'Copier',
    //                 accelerator: 'CmdOrCtrl+C',
    //                 role: 'copy'
    //             },
    //             {
    //                 label: 'Coller',
    //                 accelerator: 'CmdOrCtrl+V',
    //                 role: 'paste'
    //             }
    //         ]
    //     }
    // ])

    // Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})