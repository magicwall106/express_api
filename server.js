#!/bin/env node
//  OpenShift sample Node application
var express = require('express'),
    matches = require('./routes/matches'),
    leagues = require('./routes/leagues'),
    teams = require('./routes/teams'),
    ranking = require('./routes/ranking'),
	mongoose = require('mongoose'),
	config = require('./config.json'),
	pullMatch = require('./pull_tool/pull_match'),
	pullRanking = require('./pull_tool/pull_ranking');
var fs      = require('fs');


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
		// Mongoose connection to MongoDB (ted/ted is readonly)
		mongoose.connect(config.db_connection_url, function (error) {
			if (error) {
				console.log(error);
			}
		});
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        /*for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }*/
        self.app.use(express.bodyParser());

		self.app.get('/matches', matches.findAll);//page=?&&limit=?&&orderBy=?&&asc=asc||desc
		self.app.get('/matches/:match_id', matches.findById);
		self.app.post('/matches', matches.addOrUpdate);
		self.app.put('/matches/:match_id', matches.update);
		self.app.delete('/matches/:match_id', matches.delete);
		self.app.get('/matchesbyleagueid/:league_id', matches.findByLeagueId);
		self.app.post('/matchesbyteamname', matches.findByTeamName);

		self.app.get('/teams', teams.findAll);//page=?&&limit=?&&orderBy=?&&asc=asc||desc
		self.app.get('/teams/:team_id', teams.findById);
		self.app.post('/teams', teams.addOrUpdate);
		self.app.put('/teams/:team_id', teams.update);
		self.app.get('/teamsbyleagueid/:league_id', teams.findByLeagueId);
		self.app.delete('/teams/:team_id', teams.delete);

		self.app.get('/leagues', leagues.findAll);//page=?&&limit=?&&orderBy=?&&asc=asc||desc
		self.app.get('/leagues/:league_id', leagues.findById);
		self.app.post('/leagues', leagues.addOrUpdate);
		self.app.put('/leagues/:league_id', leagues.update);
		self.app.delete('/leagues/:league_id', leagues.delete);

		self.app.get('/ranking', ranking.findAll);//page=?&&limit=?&&orderBy=?&&asc=asc||desc
		self.app.get('/ranking/:league_id', ranking.findByLeagueId);
		self.app.post('/ranking', ranking.addOrUpdate);
		self.app.put('/ranking/:position', ranking.update);
		self.app.delete('/ranking/:position', ranking.delete);
		
		self.app.get('/pullMatch', pullMatch.pullMatch);
		self.app.get('/pullRanking', pullRanking.pullRanking);
		
		//self.app.get('/pullMatch', pullMatch.pullMatch);
		//self.app.get('/pullMatch', pullMatch.pullMatch);
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

