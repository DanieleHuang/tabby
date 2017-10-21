/* File Name: login.js
 */

function login() {
	console.log("Attempt login");
	
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	console.log(email);
	console.log(password);

  var success = true;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	alert(errorMessage);
    console.log(error);
    success = false;
	});

  if (success) {
    window.location.replace('/dashboard');
  }
};

function emailToURL(email) {
  return email.replace(/\./g,'¤');
}

function register() {
	console.log("Attempt register");
  let name = document.getElementById('firstname').value + " " + document.getElementById('lastname').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmpassword = document.getElementById('confirm_password').value;
  if (password != confirmpassword) {
    alert("The passwords do not match!");
    return;
  }

  var success = true;

	firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  	success = false;
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

  if(success) {
    login();
    var userRef = firebase.database().ref("users/" + emailToURL(email));
    userRef.set({
      "name": name,
      "eventList": [],
      "pendingOwnerships": [],
      "debts": []
    });
  }
}

