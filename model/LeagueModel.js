var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var LeagueSchema = new Schema({
	league_id: {type:Number, required: true},
	league: String,
	name: String,
	thumbnail: String,
	current_matchday: Number,
	number_of_games: Number,
	number_of_teams: Number,
	order: Number,
	year: Number,
	status: { type:Number, required: true, default:1 },
	_updated_at: { type:Date, required: true, default: Date.now },
	_created_at: { type:Date, required: true, default: Date.now }
}, { collection: 'league' });

var League = mongoose.model('league', LeagueSchema);

// make this available to our users in our Node applications
module.exports = League;
/*
var league11 = new League({
	"current_matchday" : 7,
	"league" : "CL",
	"league_id" : 405,
	"name" : "Champions League 2",
	"number_of_games" : 112,
	"number_of_teams" : 32,
	"order" : 2,
	"thumbnail" : "http://i.imgsafe.org/b1017fe.png",
	"updatedAt" : "2016-02-16T08:38:13.842Z",
	"year" : 2015

});
*/
