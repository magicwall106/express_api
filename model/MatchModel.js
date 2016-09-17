var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var MatchSchema = new Schema({
  thumbnail: String,
  title: String,
  link_type: String,
  link_video: String,
  stadium: String,
  team1: String,
  team2: String,
  score1: Number,
  score2: Number,
  date_match: Number,
  league_id: Number,
  match_id: {type:Number, required: true},
  status: { type:Number, default:1 },
  _updated_at: { type:Date, required: true, default: Date.now },
  _created_at: { type:Date, required: true, default: Date.now }
}, { collection: 'match' });

var Match = mongoose.model('match', MatchSchema);

// make this available to our users in our Node applications
module.exports = Match;
/*
var match = new Match({
  "date_match" : 1454293381000,
  "league_id" : 396,
  "link_type" : "video_player",
  "link_video" : "https://cdn.video.playwire.com/18132/videos/4550762/video-sd.mp4?hosting_id=18132",
  "match_id" : 1,
  "score1" : 1,
  "score2" : 1,
  "stadium" : "Renato Dall’Ara_Bologna",
  "status" : 1,
  "team1" : "Saint-Etienne",
  "team2" : "Monaco",
  "thumbnail" : "http://www.soccerhighlightstoday.com/wp-content/uploads/2016/02/2332183_w2-356x220.jpg",
  "title" : "Saint-Etienne 1 – 1 Monaco"

});
*/
