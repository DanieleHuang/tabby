var express = require("express");
var firebase = require("firebase");
var twilio = require("twilio");

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
app.use('/images', express.static(__dirname + '/app/Images'));
app.use('/js', express.static(__dirname + '/app/JavaScript'));

router.get("/", function(req, res) {
	res.sendFile(path + 'index.html');
});

router.get("/faq", function(req, res) {
	res.sendFile(path + 'faq.html');
});

router.get("/dashboard", function(req, res) {
	res.sendFile(path + 'dashboard.html');
});

router.get("/login", function(req, res) {
	res.sendFile(path + 'login.html');
});

router.get("/services", function(req, res) {
	res.sendFile(path + 'services.html');
});

router.get("/signup", function(req, res) {
	res.sendFile(path + 'signup.html');
});

app.use("/", router);

app.listen(3000, function() {
	console.log("Live at Port 3000");
});
