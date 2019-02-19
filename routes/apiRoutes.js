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
        
        // ~ ~ ~ ~ THE BIG ALGORITHIM for actually comparing user answers to other profiles and finding the smallest difference: ~ ~ ~ ~ ~ 

        for (var i = 0; i < friendSurveys.length; i++) { //for each profile in the friendSurveys array....

            if (friendSurveys[i].name != userAnswers.name) { //exclude the user's own profile from the comparison(TODO: this would be less fallible if every user had a unique id)

                var difference = 0;   
                var diffsFromCurrent = [];
                var sumOfDifferences = 0;     

                for (var j = 0; j < friendSurveys[i].scores.length; j++) { //loop through each number in each profile's scores....
                    
                    /* subtract one answer-number from the other for the same question, and set the result as 'difference'
                    (but to prevent negative-number results, we use an if-else to always subtract the smaller number from 
                    the larger one!) */

                    if (userAnswers.scores[j] > friendSurveys[i].scores[j]) {
                        difference = (userAnswers.scores[j] - friendSurveys[i].scores[j]);
                        console.log(difference);
                    }
                    else {
                        difference = (friendSurveys[i].scores[j] - userAnswers.scores[j]);
                        console.log(difference);
                    }
                    
                    diffsFromCurrent.push(difference); //collect all the differences from this profile into one array
                }

                for (var k = 0; k < diffsFromCurrent.length; k++) { //loop through the array of differences
                    sumOfDifferences += diffsFromCurrent[k]; //sum them into one number
                }

                diffsFromEachProfile.push(sumOfDifferences); //collect them all in array, which will be looked at later to find the best match
                
                console.log("You are " + sumOfDifferences + " points different from " + friendSurveys[i].name);
            }
        } // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

        console.log("Array of differences from each user: " + diffsFromEachProfile);

        var bestMatch = Math.min(...diffsFromEachProfile); //Math.min returns the lowest number from a set(the '...' spread syntax lets us pass it a predefined array by var; it will not work without it)

        //TODO: finish logic for the compatibility algoritihm and return best result!
    });
}