var express = require("express");
var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyB77XAZh9i8ok1VoAjHK2UsziuYE6M_9hQ",
  authDomain: "tabby-hacks2017.firebaseapp.com",
  databaseURL: "https://tabby-hacks2017.firebaseio.com",
  projectId: "tabby-hacks2017",
  storageBucket: "tabby-hacks2017.appspot.com",
  messagingSenderId: "1015964828530"
};

firebase.initializeApp(config);

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
