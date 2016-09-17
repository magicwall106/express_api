var cheerio = require("cheerio");
var http = require("http");
var fs = require("fs");

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

var preLinkVideo = "https://cdn.video.playwire.com/18132/videos/";
var tailLinkVideo = "/video-sd.mp4?hosting_id=18132";
var separator = ",";
var special_dash = " – ";
var fileName = "match";

var status = 1;
var match_id = 1;
var round = "";
var long_description = "";
var link_type="video_player";
var header = "match_id" + separator + "status" + separator + "title" + separator + "thumbnail" + separator + "league_id" + separator + "team1" + separator + "score1" + separator + "score2" + separator + "team2" + separator + "date_match" + separator + "stadium" + separator + "link_video" + separator + "link_type" + separator + "round" + separator + "long_description";

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

var currentDate = new Date();

/*fs.open(fileName + "_" + currentDate + ".csv", "a", 666, function( e, id ) {
 fs.write( id, header + "\n", null, "utf8", function(){
  fs.close(id, function(){
  });
 });
});*/
console.log(header);

for (var key in arr_url) {
	download(key, function(data) {
	  if (data) {

		var $ = cheerio.load(data);
		$("div.td-module-thumb > a").each(function(i, e) {
			//title: get title from a tag: remove Highlight, remove (), remove VIDEO
		    var title = $(e).attr("title").replace("VIDEO ","")
						.replace(" Highlights","")
						.replace("(","").replace(")","");

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
			console.log(title_temp.split(special_dash).length);
			if (title_temp.split(special_dash).length > 1) {
				var team1_score1 = title_temp.split(special_dash)[0];
				var team2_score2 = title_temp.split(special_dash)[1];
				console.log(team1_score1 + " " + team2_score2);
				var arr_team1_score1 = team1_score1.split(" ");
				score1 = arr_team1_score1[arr_team1_score1.length-1];
				team1 = team1_score1.replace(" " + score1, "");

				var arr_team2_score2 = team2_score2.split(" ");
				league = arr_team2_score2[arr_team2_score2.length-1];
				
				team2 = arr_team2_score2[1];
				score2 = arr_team2_score2[0];
			}

			title = title.replace(/(Champions League)|(La Liga)|(Serie A)|(Premier League)|(Ligue 1)|(Bundesliga)/gi, "");
			//END - Handle Title: team1,score1,score2,team2,league			

		    var href = $(e).attr("href");
		    var imgNode = $(e).find("img.entry-thumb");
		    var thumbnail = imgNode.attr("src").replace("356x220","218x150").replace("100x70","218x150");
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
					date_match = date.getTime();
				});

				//stadium, long_description: get from p tag
				$("div.td-post-content > p").each(function(i, e) {
					var description = $(e).text();
					stadium = description.split("\n")[0].replace("Stadium: ","").replace(",","_");
					description = description.replace("\n","---");
			  	});

				//link_video: get video id in script tag > add prelink and taillink
				$("script").each(function(i, e) {
					if(i === 6){
						var ajaxLink = $(e).attr("data-config");
						var hash = ajaxLink.split("/");
						var video_id = hash[hash.length -2 ];
						link_video = preLinkVideo + video_id + tailLinkVideo;
					}
				});

				var line = match_id++
						+ separator + status
						+ separator + title 
						+ separator + thumbnail 
						+ separator + league
						+ separator + team1
						+ separator + score1
						+ separator + score2
						+ separator + team2
						+ separator + date_match 
						+ separator + stadium.replace(",","_") 
						+ separator + link_video 
						+ separator + link_type
						+ separator + round
						+ separator + long_description;

				//if all fields are not null then write to file. Otherwise, ignore
				/*if(league && team1 && team2 && score1 && score2 && link_video){
					fs.open(fileName + "_" + currentDate + ".csv", "a", 666, function( e, id ) {
					 fs.write( id, line + "\n", null, "utf8", function(){
					  fs.close(id, function(){
					  });
					 });
					});
				}*/
				console.log(line);
			  }
			  else console.log("error");  
			});
		  });
	  }
	  else console.log("error");  
	});
};
