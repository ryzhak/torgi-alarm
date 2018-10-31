const fs = require('fs');
const db = require("./db/models/index.js");

fs.readdir("./auctions", (err, files) => {
	var createRequests = [];
	files.forEach(file => {
		if(file.indexOf(".json") != -1) {
			var auctions = require(`./auctions/${file}`);
			auctions.map(auction => {
				createRequests.push(db.Auction.findOrCreate({where: auction}));
			});
		}
	});
	Promise.all(createRequests).then(() => {
		process.exit();
	});
});