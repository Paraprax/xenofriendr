# xenophile

A full-stack "Friend Finder" express.js app, set in the world of the *Mass Effect* videogame franchise to spice things up.

Answer the ten survey questions on an agreement-scale of 1-5 to be algorithmically matched up with one of the preloaded
aliens in the the database, or with other previous users who have filled out the survey themselves.

The matchup-algorithim works by finding the profile whose individual answers have the lowest overall mathematical difference 
from the person submitting their survey. Descriptive profiles are generated about each user by a separate function, from a separate database of sentence fragments, which are looped through and selected based on the values of their answers.

Fill out your name, submit a valid image link, answer the ten galactically-themed questions and hit submit to see your best match.

languages and libraries used:
- HTML5
- CSS3
- Bootstrap.js
- JavaScript
- jQuery
- Express.js
