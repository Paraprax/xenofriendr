//Dependencies:
var express = require("express");

//Basic setup of properties:-----

//create our 'app' var and power it with the express package
var app = express();

//setting the port
var PORT = process.env.PORT || 8080

//set up the express app to handle data-parsing:
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//CRUCIAL - include the server-side data from 'public', so the client gets the local custom CSS doc as well 
app.use(express.static('public'));

//-------

//Routing:
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Listener:
app.listen(PORT, function() {
    console.log(`Green light! App listening on PORT: ${PORT}`);
});
