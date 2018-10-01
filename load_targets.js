const fs = require('fs');
const db = require("./db/models/index.js");

db.Target.findAll().then(targets => {
	let getCompanyRequests = [];
	for(let i = 0; i < targets.length; i++) {
		getCompanyRequests.push(db.Company.findById(targets[i].companyId));
	}
	Promise.all(getCompanyRequests).then((companies) => {
		let res = [];
		for(let i = 0; i < targets.length; i++) {
			res.push({
				companyId: targets[i].companyId,
				categoryId: targets[i].categoryId,
				inn: companies[i].inn
			});
		}
		writeTargets(res).then(() => {
			process.exit();
		})
	});
});

function writeTargets(res) {
	return new Promise((resolve, reject) => {
		fs.writeFile("./targets.json", JSON.stringify(res), 'utf8', (err) => {
			if(err) reject(err);
			resolve();
		});
	});
}