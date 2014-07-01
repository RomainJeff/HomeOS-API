var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");

var globalConfig = require("./config.js");
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
var connection = mysql.createConnection(globalConfig.mysql);
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

    objectsModel.get(id,
        function (rows)
        {
            res.send(
                JSON.stringify({
                    error: false,
                    datas: rows
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


/** START **/
console.log("Application is up !");

app.listen(3000);