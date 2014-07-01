var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var objectsModel = require("./models/objectsModel.js");


/** USE **/
app.use(bodyParser);


/** APP **/
app.put("/refresh/:id", function (req, res) {
    var id = req.query.id;
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
    var id = req.query.id;


});


/** START **/
app.listen(3000);