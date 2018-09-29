const db = require("./db/models/index.js");
const auctions = require("./auctions.json");

const createRequests = [];

auctions.map(auction => {
	createRequests.push(db.Auction.findOrCreate({where: auction}));
});

Promise.all(createRequests).then(() => {
	process.exit();
});