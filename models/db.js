//./models/db.js
'use strict';

// loads environment variables from .env
require('dotenv').config();

// knex is a database adapter for node
// npm install knex && npm install lodash
// lodash is a dependency of knex
var db = require('knex')({
  client: process.env.DB_ADAPTER,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
  }
});

module.exports = db;