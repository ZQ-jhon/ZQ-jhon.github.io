// This file just for Tecent Cloud CVM use only.
const { exec } = require('child_process');
exec(`cd ./ZQ-jhon.github.io && sudo http-server ./ -p 80`, function() {
    console.log(`http static server was listening at localhost:80, https://ZQ-jhon.club as reflect url`);
 });