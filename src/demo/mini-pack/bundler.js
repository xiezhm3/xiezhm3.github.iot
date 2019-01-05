const fs = require('fs');

function createAsset(fileName) {
    const content = fs.readFileSync(fileName, 'utf-8');
    console.log(content);
}

createAsset('./example/entry.js');