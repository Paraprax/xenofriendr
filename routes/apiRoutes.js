/* the routes for GET-ing the list of all existing profiles(as a JSON response)
&& POST-ing new user survey data to the database */

var friendSurveys = require("../data/friends.js");

module.exports = function(app) {

    //when our express server ('app') receives a 'get' request from a client to this route..
    app.get("/api/friends", function(req, res){
        res.json(friendSurveys); //it serves back a json response of existing users
    });

    //when app receives a 'post' request to this route.. 
    app.post("/api/friends", function(req, res) {

        var userAnswers = req.body;
        friendSurveys.push(req.body);
        console.log(friendSurveys);
        var sumOfDifferences = 0;
        
        // ~ ~ ~ ~ THE BIG ALGORITHIM for actually comparing user answers to other profiles and finding the smallest difference: ~ ~ ~ ~ ~ 

        for (var i = 0; i < friendSurveys.length; i++) { //for each profile in the friendSurveys array....

            if (friendSurveys[i].name != userAnswers.name) { //exclude the user's own profile from the comparison(this would be less fallible if every user had a unique id)

                var allDifferences = [];
                var difference = 0;

                for (var j = 0; j < friendSurveys[i].scores.length; j++){ //for each number in each profile's score....
                    
                    /* both the functions in this if-statement subtract one answer-number from the other for the 
                    same question and set the result as 'difference', but to prevent negative-number results, 
                    we always subtract the smaller number from the larger one: */
                    if (userAnswers.scores[j] > friendSurveys[i].scores[j]) {
                        difference = (userAnswers.scores[j] - friendSurveys[i].scores[j]); 
                    }
                    else {
                        difference = (friendSurveys[i].scores[j] - userAnswers.scores[j]);
                    }
                    
                }

                allDifferences.push(difference); //collect all the differences in one array

                for (var k = 0; k < allDifferences.length; k++) { //loop through the array of differences and sum them into one number
                    sumOfDifferences += allDifferences[k];
                }

                console.log("You are " + sumOfDifferences + " points different from " + friendSurveys[i].name);
            }
        } // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        //TODO: finish logic for the compatibility algoritihm and return best result!
    });
}