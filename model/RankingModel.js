var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var RankingSchema = new Schema({
	goalsAgainst: Number,
	position: Number,
	goalDifference: Number,
	crestURI: String,
	goals: Number,
	losses: Number,
	team_id: Number,
	teamName: String,
	points: Number,
	wins: Number,
	playedGames: Number,
	draws: Number,
	league_id: Number,
	_created_at: { type:Date, required: true, default: Date.now },
	_updated_at: { type:Date, required: true, default: Date.now }
}, { collection: 'ranking' });

var Ranking = mongoose.model('ranking', RankingSchema);

// make this available to our users in our Node applications
module.exports = Ranking;
/*
var team11 = new Team({
    "goalsAgainst": 16,
    "position": 4,
    "goalDifference": 53,
    "crestURI": "http://upload.wikimedia.org/wikipedia/de/1/1e/Paris_Saint-Germain_(seit_2013).gif",
    "goals": 68,
    "losses": 1,
    "team_id": 542,
    "teamName": "Paris Saint-Germain",
    "points": 74,
    "wins": 23,
    "playedGames": 29,
    "draws": 5,
    "league_id": 399
});
*/
