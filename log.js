const fs = require('fs');
const auctions = require('./auctions.json');

const text = `${new Date().toString()} Auctions found: ${auctions.length}\n`;
fs.appendFileSync('log.txt', text);