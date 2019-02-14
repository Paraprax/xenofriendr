/* the routes for GET-ing the list of all existing profiles(as a JSON response)
&& POST-ing new user survey data to the database */

var userSurveys = require("../data/surveyData");

module.exports = function(app) {

    //when our express server ('app') receives a 'get' request from a client to this route..
    app.get("/api/friends", function(req, res){
        res.json(userSurveys); //it serves back a json response of existing users
    });

    //when app receives a 'post' request to this route.. 
    app.post("/api/friends", function(req, res) {
        console.log("compatibility algoritihm coming soon...."); //TODO: write logic for the compatibility algoritihm
    });
}