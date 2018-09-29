- deploy with db(db:migrate, db:seed)
- install phantomjs?
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
