const nodemailer = require('nodemailer');
const db = require("./db/models/index.js");
const env = require("./env.js");

const transporter = nodemailer.createTransport({
	host: env.EMAIL_HOST,
	port: 465,
	secure: true,
	auth: {
		user: env.EMAIL_USERNAME,
		pass: env.EMAIL_PASSWORD
	}
});

let mailOptions = {
	from: env.EMAIL_USERNAME,
	to: env.EMAIL_TARGET,
	subject: '',
	html: ''
};

db.Auction.findAll({where: {isEmailSent: 0}}).then((auctions) => {

	let getCompanyRequests = [];
	for(let i = 0; i < auctions.length; i++) {
		getCompanyRequests.push(db.Company.findById(auctions[i].companyId));
	}

	let getCategoryRequests = [];
	for(let i = 0; i < auctions.length; i++) {
		getCategoryRequests.push(db.Category.findById(auctions[i].categoryId));
	}

	Promise.all(getCompanyRequests).then((companies) => {
		Promise.all(getCategoryRequests).then((categories) => {

			let sendEmailRequests = [];
			let updateAuctionRequests = [];
			for(let i = 0; i < auctions.length; i++) {
				mailOptions.subject = `Новая публикация на torgi.gov.ru: ${auctions[i].messageNumber} - ${auctions[i].itemNumber}`;
				mailOptions.html = `
					<table>
						<tbody>
							<tr>
								<td><strong>Организатор торгов</strong></td>
								<td>${companies[i].name}</td>
							</tr>
							<tr>
								<td><strong>Категория</strong></td>
								<td>${categories[i].name}</td>
							</tr>
							<tr>
								<td><strong>Номер извещения</strong></td>
								<td>${auctions[i].messageNumber}</td>
							</tr>
							<tr>
								<td><strong>Номер лота</strong></td>
								<td>${auctions[i].itemNumber}</td>
							</tr>
							<tr>
								<td><strong>Описание и характеристики имущества</strong></td>
								<td>${auctions[i].about}</td>
							</tr>
							<tr>
								<td><strong>Начальная цена</strong></td>
								<td>${auctions[i].startPrice}</td>
							</tr>
							<tr>
								<td><strong>Местоположение</strong></td>
								<td>${auctions[i].location}</td>
							</tr>
						</tbody>
					</table>
				`;
				sendEmailRequests.push(transporter.sendMail(mailOptions));
				updateAuctionRequests.push(db.Auction.update({isEmailSent: 1}, {where: {id: auctions[i].id}}));
			}

			Promise.all(sendEmailRequests).then(() => {
				Promise.all(updateAuctionRequests).then(() => {
					process.exit();
				});
			});

		})
	});
});