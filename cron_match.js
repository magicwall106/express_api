var cheerio = require("cheerio");
var http = require("http");
var Client = require('node-rest-client').Client;
var client = new Client();
var utf8 = require('utf8');

var host = "http://myapp-expressapp.rhcloud.com/matches";

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

var preLinkVideo = "https://cdn.video.playwire.com/";
var videoTitle = "/videos/";
var tailLinkVideo = "/video-sd.mp4?hosting_id=";
var special_dash = " \u0013 ";

var status = 1;
var match_id = "";
var link_type="video_player";
var arr_league = {
	"Champions League":"405",
	"La Liga":"399",
	"Serie A":"401",
	"Premier League":"398",
	"Ligue 1":"396",
	"Bundesliga":"394",
};

var arr_url = {
	"http://www.soccerhighlightstoday.com/http:/www.soccerhighlightstoday.com/topics/uncategorized/england/premier-league":"398",
	"http://www.soccerhighlightstoday.com/http:/www.soccerhighlightstoday.com/topics/uncategorized/europe/champions-league":"405",
	"http://www.soccerhighlightstoday.com/http:/www.soccerhighlightstoday.com/topics/uncategorized/italy/serie-a":"401",
	"http://www.soccerhighlightstoday.com/http:/www.soccerhighlightstoday.com/topics/uncategorized/germany/bundesliga":"394",
	"http://www.soccerhighlightstoday.com/http:/www.soccerhighlightstoday.com/topics/uncategorized/france/ligue-1":"396",
	"http://www.soccerhighlightstoday.com/http:/www.soccerhighlightstoday.com/topics/uncategorized/spain/la-liga":"399"
};


console.log("STARTING PULL MATCH....");
var currentDate = new Date();
var page = "1";//req.params.page ? req.params.page : "1" ;
for (var key in arr_url) {	
	download(key + (page === "1" ? "" : "/page/"+page), function(data) {
	  if (data) {

		var $ = cheerio.load(data);
		$("div.td-module-thumb > a").each(function(i, e) {
			//title: get title from a tag: remove Highlight, remove (), remove VIDEO
			var title = $(e).attr("title").replace("VIDEO ","")
						.replace(" Highlights","")
						.replace("(","").replace(")","");
			title = utf8.decode(title);

			//START - Handle Title: team1,score1,score2,team2,league
			var title_temp = title.replace(/(Champions League)|(La Liga)|(Serie A)|(Premier League)|(Ligue 1)|(Bundesliga)/gi, 					
				function myFunction(x){
					return arr_league[x];
				});

			var score1="";
			var team1 = "";
			var score2="";
			var team2 = "";
			var league = "";

			if (title_temp.split(special_dash).length > 1) {
				var team1_score1 = title_temp.split(special_dash)[0];
				var team2_score2 = title_temp.split(special_dash)[1];

				var arr_team1_score1 = team1_score1.split(" ");
				score1 = arr_team1_score1[arr_team1_score1.length-1];
				team1 = team1_score1.replace(" " + score1, "");

				var arr_team2_score2 = team2_score2.split(" ");
				league = arr_team2_score2[arr_team2_score2.length-1];
				
				score2 = arr_team2_score2[0];
				arr_team2_score2.splice(0, 1);
				arr_team2_score2.splice(arr_team2_score2.length-1, 1);
				team2 = arr_team2_score2.join(" ");
			}

			title = title.replace(/(Champions League)|(La Liga)|(Serie A)|(Premier League)|(Ligue 1)|(Bundesliga)/gi, "").replace(" \u0013 ", " - ");
			//END - Handle Title: team1,score1,score2,team2,league			

			var href = $(e).attr("href");
			var imgNode = $(e).find("img.entry-thumb");
			var thumbnail = imgNode.attr("src");
			var date_match="";
			var stadium = "";
			var link_video = "";

			download(href, function(detail) {
			  if (data) {
				var $ = cheerio.load(detail);
				//date_match: get time String > convert to milisecond
				$("header.td-post-title > div.td-module-meta-info > div.td-post-date > time").each(function(i, e) {
					title_date = $(e).attr("datetime");
					var date = new Date(title_date); // some mock date
					date_match = parseInt(date.getTime());
				});

				//stadium, long_description: get from p tag
				$("div.td-post-content > p").each(function(i, e) {
					var description = $(e).text();
					stadium = description.split("\n")[0].replace("Stadium: ","").replace(/,/gi,"_");
					description = description.replace("\n","---");
				});

				//link_video: get video id in script tag > add prelink and taillink
				$("script").each(function(i, e) {
					if(i === 6){
						var ajaxLink = $(e).attr("data-config");
						var hash = ajaxLink.split("/");
						var video_id = hash[hash.length -2 ];
						var hostId = hash[hash.length - 5 ];
						link_video = preLinkVideo + hostId + videoTitle + video_id + tailLinkVideo + hostId;
					}
				});

				match_id =  link_video.replace(preLinkVideo,"").replace(tailLinkVideo,"");
				//if all fields are not null then write to file. Otherwise, ignore
				if( link_video /*&& thumbnail.indexOf("100x70") > -1 */){
						var match = {};
						match.thumbnail = thumbnail.replace("100x70","218x150");
						match.title = title;
						match.link_type = link_type;
						match.link_video = link_video;
						match.stadium = stadium;
						match.team1 = team1;
						match.team2 = team2;
						match.score1 = parseInt(score1);
						match.score2 = parseInt(score2);
						match.date_match = parseInt(date_match);
						match.league_id = parseInt(league);
						match.match_id= parseInt(match_id);
						match.status = 1;
						// set content-type header and data as json in args parameter
						var args = {
							data: match,
							headers: { "Content-Type": "application/json" }
						};
						console.log(match.title);
						client.post(host, args, function (data, response) {
							
						});
				}
				//console.log(line);
			  }
			  else {
				console.log("error");
			}
		  });
		});
	  }
	  else {
		console.log("error");
	  }
	});
}
console.log("pull match success");