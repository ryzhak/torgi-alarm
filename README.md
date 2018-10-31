# Torgi alarm

Parses [torgi.gov.ru](https://torgi.gov.ru) and searches for new auctions. On new auction sends email notification to user.

## How it works
1. Parse auctions for each company via `casperjs run.js --companyId=COMPANY_ID --categoryId=CATEGORY_ID --inn=INN` and save them to *auctions/auctions_INN.json*.
2. Save auctions from *auctions* folder to DB via `node save_to_db.js`.
3. Send email notifications for unsent emails via `node send_email.js`.
4. Log date and number of auctions found for each company via `node log.js`.

## How to deploy
1. Install [nodejs](https://nodejs.org).
2. Install [phantomjs](https://github.com/ariya/phantomjs) globally.
3. Install [casperjs](http://casperjs.org/) globally.
4. `npm install`
5. Add db config file `config.js` to `db/config/config.js`:
```
const fs = require('fs');

module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'torgi_alarm',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_prod",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
```
6. Add `env.js` file to the root folder:
```
module.exports = {
	EMAIL_HOST: "smtp.yandex.ru", // smtp host
	EMAIL_USERNAME: "helper@yandex.ru", // from email
	EMAIL_PASSWORD: "password", // from password
	EMAIL_TARGET: "target@yandex.ru" // send notifications to
};
```
7. From `db` folder run migration via `../node_modules/.bin/sequelize db:migrate`.
8. From `db` folder run seed script(initial data) via `../node_modules/.bin/sequelize db:seed:all`.

## How to run
1. Add a cron job that parses all companies and saves auctions to json files
```
casperjs run.js --companyId=1 --categoryId=13 --inn=2312180144 && casperjs run.js --companyId=2 --categoryId=8 --inn=2225153948
```
2. Add a cron job that saves auctions from json files to DB, sends emails and logs found auctions
```
node save_to_db.js && node send_email.js && node log.js
```

## How to add a new company
1. Add company credentials to `Companies` DB table.
2. Add company and category where it posts auctions to `Targets` DB table(this step is optional but may be used in the future).
3. Add a new cron job that parses auctions for new company. Ex: `casperjs run.js --companyId=3 --categoryId=13 --inn=2312195782`
