var url = require('url'),
	config = require('../config.json'),
	Match = require('../model/MatchModel.js'),
	League = require('../model/LeagueModel.js'),
	Team = require('../model/TeamModel.js');

var tableName = 'match';
var defaultLimit = config.default_limit;
var defaultPage = config.default_page;

exports.findAll = function(req, res) {
	var	params = url.parse(req.url,true).query;
	
	var page = params.page || defaultPage;
	var limit = params.limit || defaultLimit;
	var sortParam = {};
	sortParam[params.orderBy || 'date_match'] = params.asc || -1;
	Match.find({}).
	sort(sortParam).
	limit(limit).
	skip((page-1) * limit).
	exec(function (err, docs) {
	  if (err) return res.send(500, { error: err });
	  console.log("access: " + req.url);
	  res.send(docs);
	});

};

exports.findById = function(req, res) {
	var match_id = parseInt(req.params.match_id);
	Match.findOne({'match_id':match_id}, function(err,docs){
		if (err) return res.send(500, { error: err });
		console.log("access: " + req.url);
		res.send(docs);
	});
};

exports.findByLeagueId = function(req, res){
	var league_id = parseInt(req.params.league_id);

	var	params = url.parse(req.url,true).query;
	
	var page = params.page || defaultPage;
	var limit = params.limit || defaultLimit;
	var sortParam = {};
	sortParam[params.orderBy || 'date_match'] = params.asc || -1;

	var query = Match.find({'league_id':league_id});
	query.sort(sortParam);
	query.limit(limit);
	query.skip((page-1) * limit);

	query.exec(function (err, docs) {
		if (err) return res.send(500, { error: err });
		console.log("access: " + req.url);
		res.send(docs);
	});
};

exports.findByTeamName = function(req, res){
	var search = req.body;

	//var	params = url.parse(req.url,true).query;
	console.log(JSON.stringify(search));
	var page = search.page || defaultPage;
	var limit = search.limit || defaultLimit;
	var teamName = search.teamName;
	var sortParam = {};
	sortParam[search.orderBy || 'date_match'] = search.asc || -1;
	console.log(teamName);
	var query = Match.find({ $or:[ {'team1':teamName}, {'team2':teamName} ]});
	query.sort(sortParam);
	query.limit(limit);
	query.skip((page-1) * limit);

	query.exec(function (err, docs) {
		if (err) return res.send(500, { error: err });
		console.log("access: " + req.url);
		res.send(docs);
	});
	//{"teamName":"Marseille","page":1,"limit":15,"asc":1,"orderBy":"date_match"}
};

exports.addOrUpdate = function(req, res) {
	var match = req.body;

	var model = new Match( match );
	/*
	model.save(function(err) {
	    // we've updated the dog into the db here
	  if (err) res.send(500, { error: err } );
	  console.log("match saved!");
	  res.send('Add ' + tableName + ' successfully' + JSON.stringify(match));
	});*/

	Match.findOne({link_video: model.link_video}, function(err, result) {
	    if(!err) {
	    	var add = true;
	        if(result) {
	            result.thumbnail = model.thumbnail;
	            result.title = model.title;
	            result.link_type = model.link_type;
	            result.stadium = model.stadium;
	            result.team1 = model.team1;
	            result.team2 = model.team2;
	            result.score1 = model.score1;
	            result.score2 = model.score2;
	            result.date_match = model.date_match;
	            result.league_id = model.league_id;
	            result.match_id = model.match_id;
	            result.status = model.status;
	            add = false;
	        } else {
	        	result = new Match();
	            result = model;
	            add = true;
	        }
	        result.save(function(errSave) {
	            if (errSave) return res.send(500, { error: errSave });
	            console.log((add ? 'Add ' : 'Update ') + tableName + ' successfully: ' + JSON.stringify(result));
				return res.status(200).send('OK');
	        });
	    } else {
	    	return res.send(500, { error: err });
	    }
	});
};

exports.update = function(req, res) {
	var match_id = parseInt(req.params.match_id);
    var match = req.body;
	Match.findOneAndUpdate({'match_id':match_id}, match, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    console.log("succesfully saved: "+ tableName + "{match_id : "+ match_id + "}");
		return res.status(200).send('OK');
	});
}

exports.delete = function(req, res) {
	var match_id = parseInt(req.params.match_id);
	Match.remove({ 'match_id': match_id }, function(err) {
	    if (err) return res.send(500, { error: err });
	    console.log("succesfully deleted: "+ tableName + "{match_id : "+ match_id + "}");
		return res.status(200).send('OK');
		
	});
}

