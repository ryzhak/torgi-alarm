const fs = require('fs');

fs.readdir("./auctions", (err, files) => {
	files.forEach(file => {
		if(file.indexOf(".json") != -1) {
			var auctions = require(`./auctions/${file}`);
            var text = `${new Date().toString()} Auctions found: ${auctions.length}\n`;
            fs.appendFileSync('log.txt', text);
		}
	});
});