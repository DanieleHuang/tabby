var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/app/HTML/';


// Static Links
app.use('/css', express.static(__dirname + '/app/CSS/'));
app.use('/html', express.static(__dirname + '/app/HTML/'));


router.get("/", function(req, res) {
	res.sendFile(path + 'index.html');
});

app.use("/", router);

app.listen(3000, function() {
	console.log("Live at Port 3000");
});
