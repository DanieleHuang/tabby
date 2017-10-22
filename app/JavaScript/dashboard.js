// Initializes Dashboard.

function Dashboard() {
  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');

  this.eventList = document.getElementById('event-list');

  this.initFirebase();
}

function setup_dashboard()
{
  var signout_heading = document.getElementById("signout_heading");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      signout_heading.innerHTML = user.displayName;
      var arrow = document.createElement("IMG");
      arrow.src = "/Images/drop_arrow.png";
      arrow.style.width = "40px";
      arrow.style.height = "40px";
      arrow.style.float = "right";
      arrow.style.marginTop = "-7px";

      signout_heading.appendChild(arrow);
      signout_heading.style.cursor = "pointer";
      signout_heading.onclick = function()
      {
        var signout_dropdown = document.getElementById("signout_dropdown");
        signout_dropdown.style.display = "block";
        signout_dropdown.style.cursor = "pointer";
        signout_dropdown.className += " hover_div";
        arrow.src = "/Images/up_arrow.png";
        signout_heading.onclick = function()
        {
          signout_dropdown_hide(signout_heading, signout_dropdown, arrow);
        }
        signout_dropdown.onclick = function()
        {
          firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            signout_dropdown.style.display = "none";
          }, function(error) {
            console.error('Sign Out Error', error);
          });        }
      }
    } else {
      signout_heading.innerHTML = "Login";
      signout_heading.style.cusor = "pointer";
      signout_heading.onclick = function()
      {
        window.location = "/login";
      }
    }
  });
}

function signout_dropdown_hide(signout_heading, signout_dropdown, arrow)
{
  arrow.src = "/Images/drop_arrow.png";
  signout_dropdown.style.display = "none";
  signout_heading.onclick = function()
  {
    arrow.src = "/Images/up_arrow.png";
    signout_dropdown.style.display = "block";
    signout_heading.onclick = function()
    {
      signout_dropdown_hide(signout_heading, signout_dropdown, arrow);
    }
  }
}

function to_signout()
{
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

  } else {
    // No user is signed in.
  }
});
}
/*
// Sets up shortcuts to Firebase features and initiate firebase auth.
Dashboard.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

Dashboard.prototype.updateData = function(name, eventlist) {
	this.userName.value = name;
	//TODO: add eventlist
}

// Loads user data.
Dashboard.prototype.attachDataListener = function() {
  // Reference to the /users/ database path.
  var refPath = "users/" + this.auth().currentUser.email;
  this.userRef = this.database.ref(refPath);
  // Make sure we remove all previous listeners.
  this.userRef.off();
  this.userRef.on('value',
  	function(snapshot) {
  		this.updateData(snapshot.child("name").val(),
  			snapshot.child("eventList").val());
  	},
  	function(errorCode){
  		console.log(errorCode)
  	}
  );
};

// Signs-out.
Dashboard.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
Dashboard.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // We load currently existing chant messages.
    this.attachDataListener(user.email);

  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
Dashboard.prototype.checkSignedInWithMessage = function() {
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

window.onload = function() {
  window.dashboard = new Dashboard();
};*/
