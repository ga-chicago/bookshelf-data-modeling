//it is time to party.js
var db = require('./db'); // db.js
// we setup our ORM (bookshelf.js)
// and pass it our database (knex.js)
var bookshelf = require('bookshelf')(db);

// Model correlates to a row in a database
// Collections correlate to tables in a database
// Bookshelf uses both of these terms
var PartyModel = bookshelf.Model.extend({
  tableName: 'parties'
});

console.log('PartyModel has loaded. Ready to party hard?!');

//export party model
module.exports = PartyModel;