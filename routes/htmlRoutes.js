// Dependencies: the 'path' package for the join function to get the correct file path in the route to our html 
var path = require("path");

//Routing:
module.exports = function(app) {
    // the user visits a url pathway -> the client hits the server with the corresponding 'get' request below -> the server sends them the corresponding html file

    //route to serve up the one other html page in this app
    app.get("/survey", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    //for any other non-predefined route, just serve them back the homepage
    app.get("/*", function(req,res) {
        res.sendFile(path.join(__dirname, "./public/xenophile.html"))
    });
}