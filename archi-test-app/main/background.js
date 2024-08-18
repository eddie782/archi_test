// import path from 'path'
// import { app, ipcMain } from 'electron'
// import serve from 'electron-serve'
// import { createWindow } from './helpers'

// const isProd = process.env.NODE_ENV === 'production'

// if (isProd) {
//   serve({ directory: 'app' })
// } else {
//   app.setPath('userData', `${app.getPath('userData')} (development)`)
// }

// ;(async () => {
//   await app.whenReady()

//   const mainWindow = createWindow('main', {
//     width: 1000,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   })

//   if (isProd) {
//     await mainWindow.loadURL('app://./home')
//   } else {
//     const port = process.argv[2]
//     await mainWindow.loadURL(`http://localhost:${port}/home`)
//     mainWindow.webContents.openDevTools()
//   }
// })()

// app.on('window-all-closed', () => {
//   app.quit()
// })

// ipcMain.on('message', async (event, arg) => {
//   event.reply('message', `${arg} World!`)
// })

import { app, BrowserWindow } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // 개발 모드와 프로덕션 모드 모두 file:// 프로토콜 사용
  window.loadURL(formatUrl({
    pathname: path.join(__dirname, isDevelopment ? '../renderer/out/index.html' : 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  window.on('closed', () => {
    mainWindow = null
  })

  return window
}

app.on('ready', () => {
  mainWindow = createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})