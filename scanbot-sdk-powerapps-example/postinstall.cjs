const shell = require('shelljs');
shell.mkdir('-p', 'out/controls/ScanBotScanner/wasm');
shell.cp('-R', 'node_modules/scanbot-web-sdk/bundle/bin/complete/*', 'out/controls/ScanBotScanner/wasm');
console.log('✅ Scanbot WASM files copied successfully');
