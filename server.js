var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/app/HTML/';


// Static Links
app.use('/css', express.static(__dirname + '/app/CSS/'));
app.use('/html', express.static(__dirname + '/app/HTML/'));
app.use('/images', express.static(__dirname + '/app/Images/'));


router.get("/", function(req, res) {
	res.sendFile(path + 'index.html');
});

router.get("/dashboard", function(req, res) {
	res.sendFile(path + 'dashboard.html');
});

router.get("/services", function(req, res) {
	res.sendFile(path + 'services.html');
});

app.use("/", router);

app.listen(3000, function() {
	console.log("Live at Port 3000");
});
