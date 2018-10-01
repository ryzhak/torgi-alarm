- deploy with db(db:migrate, db:seed)
- install phantomjs globally
- add env.js
module.exports = {
	EMAIL_HOST: "smtp.yandex.ru",
	EMAIL_USERNAME: "spektr-shop-helper@yandex.ru",
	EMAIL_PASSWORD: "123574896a",
	EMAIL_TARGET: "spektr-shop@yandex.ru"
};

- how to use
- tests
- run with casperjs run.js

add db to db/config/config.js:
module.exports = {
  development: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: "",
    password: null,
    database: "",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "",
    password: null,
    database: "",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};

TODO:
+ send email before save
+ add log
- add loop of target to run.js
- update readme
