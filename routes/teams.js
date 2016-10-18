var url = require('url'),
	config = require('../config.json'),
	Team = require('../model/TeamModel.js')

var tableName = 'team';
var defaultLimit = config.default_limit;
var defaultPage = config.default_page;

exports.findAll = function(req, res) {
	var	params = url.parse(req.url,true).query;
	
	var page = +params.page || defaultPage;
	var limit = +params.limit || defaultLimit;
	var sortParam = {};
	sortParam[params.orderBy || 'league_id'] = params.asc || 1;

	var query = Team.find({});
	query.sort(sortParam);
	query.limit(limit);
	query.skip((page-1) * limit);

	query.exec(function (err, docs) {
	  res.send(docs);
	});
};

exports.findById = function(req, res) {
	var team_id = parseInt(req.params.team_id);
	Team.findOne({'team_id':team_id}, function(err,docs){
		res.send(docs);
	});
};

exports.findByLeagueId = function(req, res){
	var league_id = parseInt(req.params.league_id);

	var	params = url.parse(req.url,true).query;
	
	var page = +params.page || defaultPage;
	var limit = +params.limit || defaultLimit;
	var sortParam = {};
	sortParam[params.orderBy || 'team_id'] = params.asc || 1;

	var query = Team.find({'league_id':league_id});
	query.sort(sortParam);
	query.limit(limit);
	query.skip((page-1) * limit);

	query.exec(function (err, docs) {
		if (err) return res.send(500, { error: err });
		res.send(docs);
	});
};

exports.addOrUpdate = function(req, res) {
	var team = req.body;

	var model = new Team( team );
	
	/*model.save(function(err) {
	  if (err) return res.send(500, { error: err });
	  return res.send('Add ' + tableName + ' successfully' + JSON.stringify(team));
	});*/

	Team.findOne({team_id: model.team_id}, function(err, result) {
	    if(!err) {
	    	var add = true;
	        if(result) {
	            result.order = model.order;
	            result.short_name = model.short_name;
	            result.name = model.name;
	            result.status = model.status;
	            result.crest_url = model.crest_url;
	            result.team_id = model.team_id;
	            result.code = model.code;
	            result.squad_market_value = model.squad_market_value;
	            result.league_id = model.league_id;
	            add = false;
	        } else {
	        	result = new Team();
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
	var team_id = parseInt(req.params.team_id);
    var team = req.body;
	Team.findOneAndUpdate({'team_id':team_id}, team, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    console.log("succesfully saved: "+ tableName + "{team_id : "+ team_id + "}");
		return res.status(200).send('OK');
	});
}

exports.delete = function(req, res) {
	var team_id = parseInt(req.params.team_id);
	Team.remove({ 'team_id': team_id }, function(err) {
	    if (err) return res.send(500, { error: err });
	    console.log("succesfully deleted: "+ tableName + "{team_id : "+ team_id + "}");
		return res.status(200).send('OK');
	});
}

exports.test = function(req, res) {
	var title = "West Brom 1 – 0 Manchester United";
	var special_dash = " – ";
	console.log(title.split(special_dash).length);
	return res.send(title.split(special_dash).length);
}

