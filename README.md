# Torgi alarm

Parses [torgi.gov.ru](https://torgi.gov.ru) and searches for new auctions. On new auction sends email notification to user.

## How it works
1. Load target companies from DB to *targets.json* via `node load_targets.js`.
2. Parse auctions via `casperjs run.js` and save them to *auctions.json*.
3. Save auctions from *auctions.json* to DB via `node save_to_db.js`.
4. Send email notifications for unsent emails via `node send_email.js`.
5. Log date and number of auctions found via `node log.js`.

## How to deploy
1. Install [phantomjs](https://github.com/ariya/phantomjs) globally.
2. Install [casperjs](http://casperjs.org/) globally.
3. `npm install`
4. Add db config file `config.js` to `db/config/config.js`:
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
5. Add `env.js` file to the root folder:
```
module.exports = {
	EMAIL_HOST: "smtp.yandex.ru", // smtp host
	EMAIL_USERNAME: "helper@yandex.ru", // from email
	EMAIL_PASSWORD: "password", // from password
	EMAIL_TARGET: "target@yandex.ru" // send notifications to
};
```
6. From `db` folder run migration via `../node_modules/.bin/sequelize db:migrate`.
7. From `db` folder run seed script(initial data) via `../node_modules/.bin/sequelize db:seed:all`.

## How to run
```
npm run execute
```

## How to add a new company
1. Add company credentials to `Companies` DB table.
2. Add company and category where it posts auctions to `Targets` DB table.