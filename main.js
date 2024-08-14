const { app, BrowserWindow, Menu, dialog } = require('electron/main')
const path = require('node:path')
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Chemin vers la base de données SQLite
const dbPath = path.join(__dirname, 'database.db');
const sqlFilePath = path.join(__dirname, 'setup.sql');

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données:', err.message);
    } else {
        console.log('Connexion réussie à la base de données SQLite.');
    }
    executeSqlScript(sqlFilePath, db);
});

function executeSqlScript(filePath, db) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier SQL:', err.message);
            return;
        }

        // Exécuter le script SQL
        db.exec(data, (err) => {
            if (err) {
                console.error('Erreur lors de l\'exécution du script SQL:', err);
            } else {
                console.log('Script SQL exécuté avec succès.');
            }
        });
    });
}

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
    db.close((err) => {
        if (err) {
            console.error('Erreur lors de la fermeture de la base de données:', err.message);
        } else {
            console.log('Base de données fermée.');
        }
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    })