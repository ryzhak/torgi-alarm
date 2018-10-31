const casper = require('casper').create();
const moment = require('moment');
const fs = require('fs');

const BASE_URL = "https://torgi.gov.ru";
const today = moment().format('DD.MM.YYYY');

casper.options.waitTimeout = 45000;

casper.start();

// Ex: casperjs run.js --companyId=1 --categoryId=13 --inn=2312180144
// get cli parameters
const companyId = casper.cli.get('companyId');
const categoryId = casper.cli.get('categoryId');
const inn = casper.cli.get('inn');
if(!companyId) throw new Error("companyId can not be null");
if(!categoryId) throw new Error("categoryId can not be null");
if(!inn) throw new Error("inn can not be null");

// parse auctions for target
var auctions = [];
const target = {
    companyId: companyId,
    categoryId: categoryId,
    inn: inn
};
parse(target);

casper.run(function() {
	fs.write(`./auctions/auctions_${inn}.json`, JSON.stringify(auctions), 'w');
	console.log("finished");
	casper.exit();
});

/**
 * Helper functions
 */

 /**
  * Returns total number of auctions
  */
function getAuctionsCount() {
    var text = document.getElementsByTagName('h2')[1].innerText;
    text = text.replace('Все: найдено лотов ', '');
    return text;
}

/**
 * Returns all auctions on current page by category id and company id
 */
function getAuctionsOnPage(categoryId, companyId) {
	var results = [];
	var rows = document.querySelectorAll('.datarow');

	for(i = 0; i < rows.length; i++) {
		var columns = rows[i].querySelectorAll('td');
		var auction = null;

		// Продажа государственного и муниципального имущества
		if(categoryId == 8) {
			auction = {
				itemNumber: columns[2].querySelectorAll('span span')[1].innerText,
				messageNumber: columns[2].querySelectorAll('span span')[0].innerText,
				about: columns[3].innerText,
				startPrice: columns[4].innerText,
				location: columns[6].innerText
			};
		}

		// Реализация имущества должников
		if(categoryId == 13) {
			auction = {
				itemNumber: columns[2].querySelectorAll('span span')[1].innerText,
				messageNumber: columns[2].querySelectorAll('span span')[0].innerText,
				about: columns[3].innerText,
				startPrice: columns[4].innerText,
				location: columns[5].innerText
			};
		}

		// additional properties
		auction['categoryId'] = categoryId;
		auction['companyId'] = companyId;

		if(!auction) throw new Error("auction can not be null");
		results.push(auction);
	}
	return results;
}

/**
 * Parses auctions by target 
 */
function parse(target) {
	var companyId = target.companyId;
	var categoryId = target.categoryId;
	var inn = target.inn;

	// open search page by category
	casper.open(BASE_URL + "/lotSearch1.html?bidKindId=" + categoryId);
	// reload
	casper.reload();
	// click on extended search
	casper.then(function() { this.click("#ext_search"); });
	// wait for extended search to be loaded
	casper.waitForText("Расширенный поиск лотов");

	// fill inn and date to form and submit it
	casper.then(function() {
		this.fill("form.lot-search", {
			"extended:bidOrganization:bidOrganizationInn": inn,
			"extended:bidNumberExtended:publishDateFrom": today
		}, true);
	});

	// open pages one by one and load auctions
	casper.then(function() {
		const auctionsCount = this.evaluate(getAuctionsCount);
		if(auctionsCount != 0) {
			// load auctions on page 1
			const pagesCount = Math.ceil(auctionsCount / 10);
			auctions = auctions.concat(this.evaluate(getAuctionsOnPage, categoryId, companyId));
			// if there is more than 1 page
			if(pagesCount > 1) {
				for(var pageIndex = 2; pageIndex <= pagesCount; pageIndex++) {
					casper.then(function(){ this.click('a[title="Перейти на одну страницу вперед"]'); });
					casper.waitUntilVisible('span[title="Перейти на страницу ' + pageIndex + '"] em[style="font-style: normal; color: black;"]');
					casper.then(function() { auctions = auctions.concat(this.evaluate(getAuctionsOnPage, categoryId, companyId)); });
				}
			}
		}
	});
}