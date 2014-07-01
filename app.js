var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
var objectsModel = require("./models/objectsModel.js");


/** USE **/
app.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
    res.header("Content-type", "application/json");

    next();
});
app.use(bodyParser());


/** MYSQL **/
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "coffee-machine"
});

objectsModel.init(connection);


/** APP **/
app.put("/refresh/:id", function (req, res) {
    var id = req.params.id;
    var ip = req.body.ip;

    objectsModel.refresh(id, ip, 
        function ()
        {
            res.send(
                JSON.stringify({
                    error: false,
                    message: "IP correctement mise a jour"
                })
            );
        },

        function (message)
        {
            console.log("[ERROR] "+ message);
            res.send(
                JSON.stringify({
                    error: true,
                    message: message
                })
            );
        }
    );
});

app.get("/get/:id", function (req, res) {
    var id = req.params.id;


});


/** START **/
app.listen(3000);