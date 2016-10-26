var express = require('express');
var router = express.Router();
// include our PartyModel
var PartyModel = require('../models/Party');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/all', renderAll);
router.get('/home', renderSQL);
router.get('/form', renderForm);
router.post('/create', insertIntoParties);
// :id should be last, wildcard pattern
router.get('/:id', renderPartyById);

function sanitizeModelsToJsonArray(dbModels) {
  var ret = [];
  var models = dbModels.models;
  for (var item in models) {
    //bookshelf.js model stores stuff in .attributes
    var row = models[item];
    var attrs = row.attributes;
    ret.push(attrs);
  }
  return ret;
};

function renderAll(req, res, next) {
  PartyModel.collection().fetch().then(function(models) {
    var sanitizedModels = sanitizeModelsToJsonArray(models);
    var resJson = {
      parties: sanitizedModels
    };
    res.render('all', resJson);
  });
};

function insertIntoParties(req, res, next) {
  console.log(req.body);

  var model = new PartyModel(req.body)
    .save()
    .then(function(data) {
      res.render('success', data.attributes);
  });
  //if you never res.json,send,render...
  // the server never finished the request
  // so express freezes. forever.
  // until ctrl-c
};

function renderForm(req, res, next) {
  res.render('form', {});
};
// create a 'get' route
// it renders a 'form.hbs'
// this form.hbs contains a <form>
// with an <input> for each attribute on the model (4)
// go!

function renderPartyById(req, res, next) {
  // call my individual model
  // first, i need the ID from req.params
  var id = parseInt(req.params.id);
  console.log(typeof id);
  if (typeof id != 'number') {
    res.json({message:'Invalid ID specified'});
  }
  PartyModel.where({
    id: id
  }).fetch().then(function(model) {
    console.log(model);
    res.render('party', model.attributes);
  });
};

function renderSQL(req, res, next) {
  //call my collection of rows (table)
  PartyModel.collection().fetch().then(function(models) {
    //res.render('all', models);
    res.json(models); //i want to believe - fox mulder
  });
};

module.exports = router;
