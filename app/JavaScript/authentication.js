/* File Name: login.js
 */

function login() {
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;

	firebase.auth().signInWithEmailAndPassword(email, password).then(
    function() {
			var user = firebase.auth().currentUser;
			if (localStorage.getItem("name") != user.displayName)
			{
				localStorage.setItem("name", user.displayName);
			}
			window.location = "/dashboard";
    },
    function(error) {
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	alert(errorMessage);
    console.log(error);
	});
};

function emailToURL(email) {
  return email.replace(/\./g,'-').toLowerCase();
}

function register() {
	console.log("Attempt register");
  let fullname = document.getElementById('firstname').value + " " + document.getElementById('lastname').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmpassword = document.getElementById('confirm_password').value;
  let phoneNumber = document.getElementById('phone-number').value;
  if (! /^[0-9]{11}$/.test(phoneNumber)) {
    alert("Please input exactly 11 numbers!");
    return;
  }
  else{
  	phoneNumber = '+'+phoneNumber;
  }
  if (password != confirmpassword) {
    alert("The passwords do not match!");
    return;
  }

	firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
			var user = firebase.auth().currentUser;
			var first_name = document.getElementById("firstname").value;
			var last_name = document.getElementById("lastname").value;
			user.updateProfile({
  			displayName: first_name + " " + last_name
			}).then(function() {
  			// Update successful.
			}).catch(function(error) {
  			// An error happened.
			});

      console.log("Created successfully");

      var userRef = firebase.database().ref("users/" + emailToURL(email));
      userRef.once("value").then(
        function(snapshot) {
          if(snapshot.exists() == false) {
            console.log("DNE");
            userRef.set({
              name: fullname,
              phoneNumber: phoneNumber
            }).then(function() { login();});
          }
        }
      );
    },
    function(error) {
    	// Handle Errors here.
    	var errorCode = error.code;
    	var errorMessage = error.message;
    	if (errorCode == 'auth/weak-password') {
     		alert('The password is too weak.');
    	} else {
      	alert(errorMessage);
    	}
    	console.log(error);
  	});
}
