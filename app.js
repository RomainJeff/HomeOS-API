var express = require("express");
var app = express();
var bodyParser = require("body-parser");


/** USE **/
app.use(bodyParser);


/** APP **/
app.put("/refresh/:id", function (req, res) {
    var id = req.query.id;


});

app.get("/get/:id", function (req, res) {
    var id = req.query.id;

    
});


/** START **/
app.listen(3000);