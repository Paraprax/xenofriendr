/* this file holds all of the submitted profiles, as objects in an array;
the first six objects are prewritten examples*/

var friendsArray = [
    {
    "name":"Nylana",
    "species":"asari",
    "photo":"https://imgur.com/rbrmz4s",
    "scores":[
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
  },
  {
    "name":"Grudge",
    "species":"krogan",
    "photo":"https://imgur.com/vJ1uQC3",
    "scores":[
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
  }
]
  
module.exports = friendsArray; /* module.exports is used here to make the array 
accessible to other files in the app if they use 'require' on to import it:*/
