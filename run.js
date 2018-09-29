const casper = require('casper').create();
const moment = require('moment');

const BASE_URL = "https://torgi.gov.ru";
// const today = moment().format('DD.MM.YYYY');
const today = "01.09.2018";

casper.options.waitTimeout = 45000;

// for all targets
// get company inn
const categoryId = 8; // Продажа государственного и муниципального имущества
const inn = "2308171570";
var auctions = [];

// open search page by category
casper.start(BASE_URL + "/lotSearch1.html?bidKindId=" + categoryId);
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
		auctions = this.evaluate(getAuctionsOnPage, categoryId);
		// if there is more than 1 page
		if(pagesCount > 1) {
			for(var pageIndex = 2; pageIndex <= pagesCount; pageIndex++) {
				casper.then(function(){ this.click('a[title="Перейти на одну страницу вперед"]'); });
				casper.waitUntilVisible('span[title="Перейти на страницу ' + pageIndex + '"] em[style="font-style: normal; color: black;"]');
				casper.then(function() { auctions = auctions.concat(this.evaluate(getAuctionsOnPage, categoryId)); });
			}
		}
	}
});

// save auctions to DB
casper.then(function() {
	console.log(auctions.length);
});

// send emails

casper.run();

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
 * Returns all auctions on current page by category id
 */
function getAuctionsOnPage(categoryId) {
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

		if(!auction) throw new Error("auction can not be null");
		results.push(auction);
	}
	return results;
}