var cheerio = require("cheerio");
var http = require("http");
var fs = require("fs");

var Client = require('node-rest-client').Client;
var client = new Client();
var host = "http://myapp-expressapp.rhcloud.com/ranking";
var hostImg = 'http://i1278.photobucket.com/albums/y512/MW_MagicWall/express/football/logoteam/';
// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on("data", function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var preLinkVideo = "http://api.football-data.org/v1/soccerseasons/";
var tailLinkVideo = "/leagueTable";
var separator = ",";
var special_dash = " – ";
var fileName = "ranking";

var arr_url = {
	"398":"398",
	//"405":"405",
	"401":"401",
	"394":"394",
	"396":"396",
	"399":"399"
};
console.log("STARTING PULL RANKING....");
download(preLinkVideo+'394'+tailLinkVideo, function(data) {
  if (data) {
  	var standing = JSON.parse(data).standing;
  	var lines= [];
  	standing = standing.filter(function(item){
		JSON.stringify(item);
		var ranking = {};
		ranking.goalsAgainst = parseInt(item.goalsAgainst);
		ranking.position = parseInt(item.position);
		ranking.goalDifference = parseInt(item.goalDifference);
		ranking.crestURI = hostImg + 
			item._links.team.href.split('/')[item._links.team.href.split('/').length-1] + 
			'.png';
		ranking.goals = parseInt(item.goals);
		ranking.losses = parseInt(item.losses);
		ranking.teamName = item.teamName;
		ranking.points = parseInt(item.points);
		ranking.wins = parseInt(item.wins);
		ranking.playedGames = parseInt(item.playedGames);
		ranking.draws = parseInt(item.draws);
		ranking.team_id =  item._links.team.href.split('/')[item._links.team.href.split('/').length-1];
		ranking.league_id = 394;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: ranking,
			headers: { "Content-Type": "application/json" }
		};
		console.log(ranking.teamName);
		client.post(host, args, function (data, response) {
			
		});
	  return;
	});
	console.log("DONE");
  }
  else console.log("error");  
});

download(preLinkVideo+'396'+tailLinkVideo, function(data) {
  if (data) {
  	var standing = JSON.parse(data).standing;
  	var lines= [];
  	standing = standing.filter(function(item){
		JSON.stringify(item);
		var ranking = {};
		ranking.goalsAgainst = parseInt(item.goalsAgainst);
		ranking.position = parseInt(item.position);
		ranking.goalDifference = parseInt(item.goalDifference);
		ranking.crestURI = hostImg + 
			item._links.team.href.split('/')[item._links.team.href.split('/').length-1] + 
			'.png';
		ranking.goals = parseInt(item.goals);
		ranking.losses = parseInt(item.losses);
		ranking.teamName = item.teamName;
		ranking.points = parseInt(item.points);
		ranking.wins = parseInt(item.wins);
		ranking.playedGames = parseInt(item.playedGames);
		ranking.draws = parseInt(item.draws);
		ranking.team_id =  item._links.team.href.split('/')[item._links.team.href.split('/').length-1];
		ranking.league_id = 396;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: ranking,
			headers: { "Content-Type": "application/json" }
		};
		console.log(ranking.teamName);
		client.post(host, args, function (data, response) {
			
		});
	  return;
	});
	console.log("DONE");
  }
  else console.log("error");  
});

download(preLinkVideo+'398'+tailLinkVideo, function(data) {
  if (data) {
  	var standing = JSON.parse(data).standing;
  	var lines= [];
  	standing = standing.filter(function(item){
		JSON.stringify(item);
		var ranking = {};
		ranking.goalsAgainst = parseInt(item.goalsAgainst);
		ranking.position = parseInt(item.position);
		ranking.goalDifference = parseInt(item.goalDifference);
		ranking.crestURI = hostImg + 
			item._links.team.href.split('/')[item._links.team.href.split('/').length-1] + 
			'.png';
		ranking.goals = parseInt(item.goals);
		ranking.losses = parseInt(item.losses);
		ranking.teamName = item.teamName;
		ranking.points = parseInt(item.points);
		ranking.wins = parseInt(item.wins);
		ranking.playedGames = parseInt(item.playedGames);
		ranking.draws = parseInt(item.draws);
		ranking.team_id =  item._links.team.href.split('/')[item._links.team.href.split('/').length-1];
		ranking.league_id = 398;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: ranking,
			headers: { "Content-Type": "application/json" }
		};
		console.log(ranking.teamName);
		client.post(host, args, function (data, response) {
			
		});
	  return;
	});
	console.log("DONE");
  }
  else console.log("error");  
});

download(preLinkVideo+'399'+tailLinkVideo, function(data) {
  if (data) {
  	var standing = JSON.parse(data).standing;
  	var lines= [];
  	standing = standing.filter(function(item){
		JSON.stringify(item);
		var ranking = {};
		ranking.goalsAgainst = parseInt(item.goalsAgainst);
		ranking.position = parseInt(item.position);
		ranking.goalDifference = parseInt(item.goalDifference);
		ranking.crestURI = hostImg + 
			item._links.team.href.split('/')[item._links.team.href.split('/').length-1] + 
			'.png';
		ranking.goals = parseInt(item.goals);
		ranking.losses = parseInt(item.losses);
		ranking.teamName = item.teamName;
		ranking.points = parseInt(item.points);
		ranking.wins = parseInt(item.wins);
		ranking.playedGames = parseInt(item.playedGames);
		ranking.draws = parseInt(item.draws);
		ranking.team_id =  item._links.team.href.split('/')[item._links.team.href.split('/').length-1];
		ranking.league_id = 399;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: ranking,
			headers: { "Content-Type": "application/json" }
		};
		console.log(ranking.teamName);
		client.post(host, args, function (data, response) {
			
		});
	  return;
	});
	console.log("DONE");
  }
  else console.log("error");  
});

download(preLinkVideo+'401'+tailLinkVideo, function(data) {
  if (data) {
  	var standing = JSON.parse(data).standing;
  	var lines= [];
  	standing = standing.filter(function(item){
		JSON.stringify(item);
		var ranking = {};
		ranking.goalsAgainst = parseInt(item.goalsAgainst);
		ranking.position = parseInt(item.position);
		ranking.goalDifference = parseInt(item.goalDifference);
		ranking.crestURI = hostImg + 
			item._links.team.href.split('/')[item._links.team.href.split('/').length-1] + 
			'.png';
		ranking.goals = parseInt(item.goals);
		ranking.losses = parseInt(item.losses);
		ranking.teamName = item.teamName;
		ranking.points = parseInt(item.points);
		ranking.wins = parseInt(item.wins);
		ranking.playedGames = parseInt(item.playedGames);
		ranking.draws = parseInt(item.draws);
		ranking.team_id =  item._links.team.href.split('/')[item._links.team.href.split('/').length-1];
		ranking.league_id = 401;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: ranking,
			headers: { "Content-Type": "application/json" }
		};
		console.log(ranking.teamName);
		client.post(host, args, function (data, response) {
			
		});
	  return;
	});
	console.log("DONE");
  }
  else console.log("error");  
});
console.log("END PULL RANKING....");