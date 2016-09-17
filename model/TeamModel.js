var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var TeamSchema = new Schema({
  short_name: String,
  name: String,
  status: { type:Number, default:1 },
  crest_url: String,
  team_id: {type:Number, required: true},
  code: String,
  squad_market_value: Number,
  league_id: Number,
  _created_at: { type:Date, required: true, default: Date.now },
  _updated_at: { type:Date, required: true, default: Date.now }
}, { collection: 'team' });

var Team = mongoose.model('team', TeamSchema);

// make this available to our users in our Node applications
module.exports = Team;
/*
var team11 = new Team({
  order: 1,
  short_name: 'short_name',
  name: 'name',
  status: 1,
  crest_url: 'String',
  team_id: 22,
  code: 'String',
  squad_market_value: 2,
  league_id: 2
});
*/
