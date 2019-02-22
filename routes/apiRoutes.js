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
        var diffsFromEachProfile = []; //must be defined as empty after the post-request, but outside of the algorithim below, which will add one entry to it per loop
        
        // ~ ~ ~ ~ THE BIG ALGORITHIM for actually comparing user answers to other profiles and finding the smallest overall difference: ~ ~ ~ ~ ~ 

         //for each profile in the friendSurveys array:
        for (var i = 0; i < friendSurveys.length; i++) {
            
            //excluding the user's own profile, now in the database, from being analyzed along with the rest:
            if (friendSurveys[i].name != userAnswers.name) { //(TODO: this exclusion would be less fallible if every user had a unique id..)

                var difference = 0;   
                var diffsFromCurrent = [];
                var sumOfDifferences = 0;     

                //loop through each number in each profile's scores:
                for (var j = 0; j < friendSurveys[i].scores.length; j++) { 
                    
                    /* subtract one answer-number from the other for the same question, and set the result as 'difference'
                    (but to prevent negative-number results, we use an if-else to always subtract the smaller number from 
                    the larger one): */
                    if (userAnswers.scores[j] > friendSurveys[i].scores[j]) {
                        difference = (userAnswers.scores[j] - friendSurveys[i].scores[j]);
                        //console.log(difference);
                    }
                    else {
                        difference = (friendSurveys[i].scores[j] - userAnswers.scores[j]);
                        //console.log(difference);
                    }
                    //collect all the differences from this profile into one array:
                    diffsFromCurrent.push(difference); 
                }

                //loop through the array of differences and steadily sum them into one big number:
                for (var k = 0; k < diffsFromCurrent.length; k++) {
                    sumOfDifferences += diffsFromCurrent[k];
                }

                //collect every sum in one overall array, which will be looked at later to find the best match:
                diffsFromEachProfile.push(sumOfDifferences);
                
                console.log("You are " + sumOfDifferences + " points different from " + friendSurveys[i].name);
            }
        } // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        console.log("Array of differences from each user: " + diffsFromEachProfile);

        var bestMatch = Math.min(...diffsFromEachProfile); //Math.min returns the lowest number from a set(the '...' spread syntax lets us pass it a predefined array by var; it will not work without it)
        var bestMatchIndexNumber = diffsFromEachProfile.indexOf(bestMatch); //indexOf is used to find the index number of the best match

        //match the index-number of the lowest difference-score with the index-number of the corresponding profile in the database to find the user's best match!:
        var matchingProfile = friendSurveys[bestMatchIndexNumber];
        
        var matchingProfileName = friendSurveys[bestMatchIndexNumber].name;
        console.log(matchingProfileName + " is your best match on Xenophile!");

        return res.json(matchingProfile); //set matchingProfile as the response from this function, so it will be returned accessibly by POST requests to this route
    });
}