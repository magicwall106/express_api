var url = require('url'),
	config = require('../config.json'),
	Ranking = require('../model/RankingModel.js')

var tableName = 'ranking';
var defaultLimit = config.default_limit;
var defaultPage = config.default_page;

exports.findAll = function(req, res) {
	var	params = url.parse(req.url,true).query;
	
	var page = +params.page || defaultPage;
	var limit = +params.limit || defaultLimit;
	var sortParam = {};
	sortParam[params.orderBy || 'position'] = params.asc || 1;

	var query = Ranking.find({});
	query.sort(sortParam);
	query.limit(limit);
	query.skip((page-1) * limit);

	query.exec(function (err, docs) {
	  res.send(docs);
	});
};

exports.findByLeagueId = function(req, res) {
	var league_id = parseInt(req.params.league_id);
	var	params = url.parse(req.url,true).query;
	
	var page = +params.page || defaultPage;
	var limit = +params.limit || defaultLimit;
	var sortParam = {};
	sortParam[params.orderBy || 'position'] = params.asc || -1;

	var query = Ranking.find({'league_id':league_id});
	query.sort(sortParam);
	query.limit(limit);
	query.skip((page-1) * limit);

	query.exec(function (err, docs) {
	  res.send(docs);
	});
};

exports.addOrUpdate = function(req, res) {
	var ranking = req.body;
	var model = new Ranking( ranking );
	Ranking.findOne({position: model.position, league_id: model.league_id}, function(err, result) {
	    if(!err) {
	    	var add = true;
	        if(result) {
	            result.goalsAgainst = model.goalsAgainst;
	            result.goalDifference = model.goalDifference;
	            result.crestURI = model.crestURI;
	            result.goals = model.goals;
	            result.losses = model.losses;
	            result.team_id = model.team_id;
	            result.teamName = model.teamName;
	            result.points = model.points;
	            result.wins = model.wins;
	            result.playedGames = model.playedGames;
	            result.draws = model.draws;
	            add = false;
	        } else {
	        	result = new Ranking();
	            result = model;
	            add = true;
	        }
	        result.save(function(errSave) {
	            if (errSave) return res.send(500, { error: errSave });
	            console.log( (add ? 'Add ' : 'Update ') + tableName + ' successfully: ' + JSON.stringify(result));
				return res.status(200).send('OK');
	        });
	    } else {
	    	return res.send(500, { error: err });
	    }
	});
};

exports.update = function(req, res) {
	var position = req.params.position;
    var ranking = req.body;
	Ranking.findOneAndUpdate({'position':position}, ranking, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    console.log("succesfully saved: "+ tableName + "{position : "+ position + "}");
		return res.status(200).send('OK');
	});
}

exports.delete = function(req, res) {
	var position = req.params.position;
	Ranking.remove({ 'position': position }, function(err) {
	    if (err) return res.send(500, { error: err });
	    console.log("succesfully deleted: "+ tableName + "{position : "+ position + "}");
		return res.status(200).send('OK');
	});
}

