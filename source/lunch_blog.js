// This file just for Tecent Cloud CVM use only.
const { exec } = require('child_process');
exec(`sudo http-server ./ZQ-jhon.github.io/ -p 80`, function() {
    console.log(`http static server was listening at localhost:80, https://ZQ-jhon.club as reflect url`);
});