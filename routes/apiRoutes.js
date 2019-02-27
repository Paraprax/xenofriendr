/* the routes for GET-ing the list of all existing profiles(as a JSON response)
&& POST-ing new user survey data to the database */

var friendSurveys = require("../data/friends.js");
var matchDescription = require("../data/descriptions.js");

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

        function blurbGenerator(profile) { //a function that can be passed a profile and assemble a blurb of descriptive text about them based on their survey answers

            var descriptorArray = ["","","","","","","","","",""]; //array of ten empty strings to be set by loop

            for (var i = 0; i < descriptorArray.length; i++) {
                switch (profile.scores[i]) { //look at their answer to each survey question
                    case 1: 
                        descriptorArray[i] = matchDescription[i].low //set each string in the array to a 'low' description(from the descriptions.js file) if they answered 1 or 2..
                        break;
                    case 2: 
                        descriptorArray[i] = matchDescription[i].low
                        break;
                    case 3: 
                        descriptorArray[i] = matchDescription[i].neutral //'neutral' for 3's..
                        break;
                    case 4: 
                        descriptorArray[i] = matchDescription[i].high //or 'high' for 4's and 5's
                        break;
                    case 5: 
                        descriptorArray[i] = matchDescription[i].high
                        break;
                }
            }

            var blurb = //a blurb about the profile is built out of sentences assigned to vars by the switchcase statement above, with the cracks filled in by a few hardcoded words:
            `${descriptorArray[0]}, ${profile.name} 
            ${descriptorArray[5]}. They ${descriptorArray[6]}, and tend to ${descriptorArray[1]}.
            ${profile.name} ${descriptorArray[4]}, and ${descriptorArray[2]}. They ${descriptorArray[7]},
            and ${descriptorArray[8]}. ${profile.name} ${descriptorArray[3]}, and ${descriptorArray[9]}.`;

            return blurb;
        }

        var matchBlurb = blurbGenerator(matchingProfile); //calls the blurbGenerator function, passes it the matchingProfile var, and sets the returned blurb to a new var

        var returnData = [matchingProfile, matchBlurb] //puts these two pieces of relevant data into a single array var, so it can be returned by res.json() below
        
        var matchingProfileName = friendSurveys[bestMatchIndexNumber].name; //server-side console log stuff for testing
        console.log(matchingProfileName + " is your best match on Xenophile!");
        
        return res.json(returnData); //sets the data to be returned by POST requests to this route
    });
}