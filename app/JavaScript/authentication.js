/* File Name: login.js
 */

function login() {
	console.log("Attempt login");

	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;

	firebase.auth().signInWithEmailAndPassword(email, password).then(
    function() {
			window.location = "/dashboard";
      //window.location.replace('/dashboard');
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
  return email.replace(/\./g,'-');
}

function register() {
	console.log("Attempt register");
  let fullname = document.getElementById('firstname').value + " " + document.getElementById('lastname').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmpassword = document.getElementById('confirm_password').value;
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
  			displayName: first_name + " " + last_name,
  			photoURL: "https://example.com/jane-q-user/profile.jpg"
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
              name: fullname
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
