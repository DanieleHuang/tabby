var express = require("express");
var parser = require("body-parser");
var firebase = require("firebase");
var twilio = require("twilio");

var urlencodedParser = parser.urlencoded({extended: true});

var TWILIO_ACCOUNT_SID = "AC00d63ff8051c139cef7e5b3feb867e18";
var TWILIO_AUTH_TOKEN = "d081abb612423253a05f8969729decb3";
var TWILIO_PHONE_NUMBER = "+14158911352";

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

router.post("/send_sms", urlencodedParser, function(req, res) {
	var client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
	client.messages.create({
	    body: req.body.message,
	    to: req.body.phoneNumber,  // Text this number
	    from: TWILIO_PHONE_NUMBER // From a valid Twilio number
	})
	.then((message) => console.log(message.sid));
	res.send("done");
}); 

app.use("/", router);

app.listen(3000, function() {
	console.log("Live at Port 3000");
});
