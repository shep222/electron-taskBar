const path = require('path')
const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;

let mainWinow;
let tray;

app.on('ready', ()=>{
    mainWinow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false
    });
    mainWinow.loadURL(`file://${__dirname}/src/index.html`)


    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png' ;
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
    tray = new Tray(iconPath);
    tray.on('click', (event, bounds)=>{
        // Click event Bounds
        const { x,y } = bounds
        // Window Bounds
        const { height, width } = mainWinow.getBounds();

        if (mainWinow.isVisible()) {
            mainWinow.hide()
        } else{
            const yPosition = process.platform === 'darwin' ? y : y - height ;
            mainWinow.setBounds({
                x: x - (width/2),
                y: yPosition,
                height,
                width
            })
            mainWinow.show()
        }
    })
})
