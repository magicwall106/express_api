var url = require('url'),
	config = require('../config.json'),
	League = require('../model/LeagueModel.js')

var tableName = 'league';
var defaultLimit = config.default_limit;
var defaultPage = config.default_page;

exports.findAll = function(req, res) {
	var	params = url.parse(req.url,true).query;
	
	var page = +params.page || defaultPage;
	var limit = +params.limit || defaultLimit;
	var sortParam = {};
	sortParam[params.orderBy || 'order'] = params.asc || 1;

	var query = League.find({});
	query.sort(sortParam);
	query.limit(limit);
	query.skip((page-1) * limit);

	query.exec(function (err, docs) {
	  res.send(docs);
	});
};

exports.findById = function(req, res) {
	var league_id = parseInt(req.params.league_id);
	League.findOne({'league_id':league_id}, function(err,docs){
		res.send(docs);
	});
};

exports.addOrUpdate = function(req, res) {
	var league = req.body;

	var model = new League( league );

	/*model.save(function(err) {
	    // we've updated the dog into the db here
	  if (err) res.send(500, { error: err } );
	  console.log("league saved!");
	  res.send('Add ' + tableName + ' successfully' + JSON.stringify(league));
	});*/

	League.findOne({league_id: model.league_id}, function(err, result) {
	    if(!err) {
	    	var add = true;
	        if(result) {
	            result.league = model.league;
	            result.name = model.name;
	            result.thumbnail = model.thumbnail;
	            result.current_matchday = model.current_matchday;
	            result.number_of_games = model.number_of_games;
	            result.number_of_teams = model.number_of_teams;
	            result.order = model.order;
	            result.year = model.year;
	            result.status = model.status;
	            add = false;
	        } else {
	        	result = new League();
	            result = model;
	            add = true;
	        }
	        result.save(function(errSave) {
	            if (errSave) return res.send(500, { error: errSave });
	            console.log( (add?'Add ':'Update ') + tableName + ' successfully: ' + JSON.stringify(result));
				return res.status(200).send('OK');
	        });
	    } else {
	    	return res.send(500, { error: err });
	    }
	});
};

exports.update = function(req, res) {
	var league_id = parseInt(req.params.league_id);
    var league = req.body;
	League.findOneAndUpdate({'league_id':league_id}, league, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    console.log("succesfully saved: "+ tableName + "{league_id : "+ league_id + "}");
		return res.status(200).send('OK');
	});
}

exports.delete = function(req, res) {
	var league_id = parseInt(req.params.league_id);
	League.remove({ 'league_id': league_id }, function(err) {
	    if (err) return res.send(500, { error: err });
	    console.log("succesfully deleted: "+ tableName + "{league_id : "+ league_id + "}");
		return res.status(200).send('OK');
	});
}

