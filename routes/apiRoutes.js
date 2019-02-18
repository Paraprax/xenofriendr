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
        
        for (var i = 0; i < friendSurveys.length; i++) { //for each profile in the friendSurveys array....

            if (friendSurveys[i].name != userAnswers.name) { //exclude the user's own profile from the comparison(this would be less fallible if every user had a unique id)

                console.log("bongo banana"); //test
                console.log(userAnswers.scores[i]);
                var allDifferences = [];
                var difference = 0;

                for (var j = 0; j < friendSurveys[i].scores.length; j++){ //for each number in each profile's score....
                    
                    if (userAnswers.scores[j] > friendSurveys[i].scores[j]) {
                        difference = (userAnswers.scores[j] - friendSurveys[i].scores[j]); //subtract the profile-number from the user-number for the same question and set the result as a var called 'difference'
                        console.log(difference + "alpha");
                    }
                    else {
                        difference = (friendSurveys[i].scores[j] - userAnswers.scores[j]); //subtract the profile-number from the user-number for the same question and set the result as a var called 'difference'
                        console.log(difference + "beta");
                    }
                    
                    allDifferences.push(difference); //collect all the differences in one array
                    console.log(allDifferences);
                }

                console.log(friendSurveys[i].name);

                for (var k = 0; k < allDifferences.length; k++) { //loop through the array of differences and sum them into one number
                    sumOfDifferences += allDifferences[k];
                }

                console.log("You are " + sumOfDifferences + " points different from " + friendSurveys[i].name);
            }
        }

        console.log("compatibility algoritihm coming soon...."); //TODO: finish logic for the compatibility algoritihm
    });
}