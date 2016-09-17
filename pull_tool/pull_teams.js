var cheerio = require("cheerio");
var http = require("http");
var fs = require("fs");

var Client = require('node-rest-client').Client;
var client = new Client();
var hostImg = 'http://i1278.photobucket.com/albums/y512/MW_MagicWall/express/football/logoteam/';

var host = "http://myapp-expressapp.rhcloud.com/teams";
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
var tailLinkVideo = "/teams";
var separator = ",";
var special_dash = " – ";
var fileName = "ranking";

var arr_url = {
	"394":"394",
	"396":"396",
	"398":"398",
	"399":"399",
	"401":"401"//,
	//"405":"405"	
};

download(preLinkVideo+'394'+tailLinkVideo, function(data) {
  if (data) {
  	var teams = JSON.parse(data).teams;
  	var lines= [];
  	teams = teams.filter(function(item){
		var team = {};		
		team.short_name = item.shortName;
	    team.name = item.name;
	    team.status = 1;
		var hrefArr = item._links.self.href.split("/");
		var teamId = parseInt(hrefArr[hrefArr.length -1]);
	    team.crest_url = hostImg + teamId + ".png";
	    team.team_id = teamId;
	    team.code = item.code;
	    team.squad_market_value = parseInt(item.squadMarketValue.replace(/ €/gi,"").replace(/,/gi,""));
	    team.league_id = 394;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: team,
			headers: { "Content-Type": "application/json" }
		};
		//console.log(JSON.stringify(args));
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
  	var teams = JSON.parse(data).teams;
  	var lines= [];
  	teams = teams.filter(function(item){
		var team = {};		
		team.short_name = item.shortName;
	    team.name = item.name;
	    team.status = 1;
	    var hrefArr = item._links.self.href.split("/");
		var teamId = parseInt(hrefArr[hrefArr.length -1]);
	    team.crest_url = hostImg + teamId + ".png";
	    team.team_id = teamId;
	    team.code = item.code;
	    team.squad_market_value = parseInt(item.squadMarketValue.replace(/ €/gi,"").replace(/,/gi,""));
	    team.league_id = 396;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: team,
			headers: { "Content-Type": "application/json" }
		};
		//console.log(JSON.stringify(args));
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
  	var teams = JSON.parse(data).teams;
  	var lines= [];
  	teams = teams.filter(function(item){
		var team = {};		
		team.short_name = item.shortName;
	    team.name = item.name;
	    team.status = 1;
	    var hrefArr = item._links.self.href.split("/");
		var teamId = parseInt(hrefArr[hrefArr.length -1]);
	    team.crest_url = hostImg + teamId + ".png";
	    team.team_id = teamId;
	    team.code = item.code;
	    team.squad_market_value = parseInt(item.squadMarketValue.replace(/ €/gi,"").replace(/,/gi,""));
	    team.league_id = 398;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: team,
			headers: { "Content-Type": "application/json" }
		};
		//console.log(JSON.stringify(args));
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
  	var teams = JSON.parse(data).teams;
  	var lines= [];
  	teams = teams.filter(function(item){
		var team = {};		
		team.short_name = item.shortName;
	    team.name = item.name;
	    team.status = 1;
	    var hrefArr = item._links.self.href.split("/");
		var teamId = parseInt(hrefArr[hrefArr.length -1]);
	    team.crest_url = hostImg + teamId + ".png";
	    team.team_id = teamId;
	    team.code = item.code;
	    team.squad_market_value = parseInt(item.squadMarketValue.replace(/ €/gi,"").replace(/,/gi,""));
	    team.league_id = 399;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: team,
			headers: { "Content-Type": "application/json" }
		};
		//console.log(JSON.stringify(args));
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
  	var teams = JSON.parse(data).teams;
  	var lines= [];
  	teams = teams.filter(function(item){
		var team = {};		
		team.short_name = item.shortName;
	    team.name = item.name;
	    team.status = 1;
	    var hrefArr = item._links.self.href.split("/");
		var teamId = parseInt(hrefArr[hrefArr.length -1]);
	    team.crest_url = hostImg + teamId + ".png";
	    team.team_id = teamId;
	    team.code = item.code;
	    team.squad_market_value = parseInt(item.squadMarketValue.replace(/ €/gi,"").replace(/,/gi,""));
	    team.league_id = 401;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: team,
			headers: { "Content-Type": "application/json" }
		};
		//console.log(JSON.stringify(args));
		client.post(host, args, function (data, response) {
			
		});
	  return;
	});
	console.log("DONE");
  }
  else console.log("error");  
});

/*
download(preLinkVideo+'405'+tailLinkVideo, function(data) {
  if (data) {
  	var teams = JSON.parse(data).teams;
  	var lines= [];
  	teams = teams.filter(function(item){
		var team = {};		
		team.short_name = item.shortName;
	    team.name = item.name;
	    team.status = 1;
	    team.crest_url = item.crestUrl;
		hrefArr = item._links.self.href.split("/");
	    team.team_id = parseInt(hrefArr[hrefArr.length -1]);
	    team.code = item.code;
	    team.squad_market_value = parseInt(item.squadMarketValue.replace(/ €/gi,"").replace(/,/gi,""));
	    team.league_id = 405;
		
		// set content-type header and data as json in args parameter
		var args = {
			data: team,
			headers: { "Content-Type": "application/json" }
		};
		//console.log(JSON.stringify(args));
		client.post(host, args, function (data, response) {
			
		});
	  return;
	});
	console.log("DONE");
  }
  else console.log("error");  
});*/