/* File Name: login.js
 */

function login(name) {
	console.log("Attempt login");
	
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;

	firebase.auth().signInWithEmailAndPassword(email, password).then(
    function() {
      var userRef = firebase.database().ref("users/" + emailToURL(email));
      userRef.once("value")
        .then(function(snapshot) {
          if(!snapshot.child("name").exists()) {
            userRef.set({
              "name": name
            });
          }
        }
      );
      window.location.replace('/dashboard');
    },
    function(error) {
	  // Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	alert(errorMessage);
    console.log(error);
	});
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

	firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      console.log("Created successfully");
      login(name);
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

