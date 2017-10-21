// Initializes Event.
function Event() {
  // Shortcuts to DOM Elements.
  this.eventName = document.getElementById('event-name');
  this.eventId;
  this.ownerName = document.getElementById('owner-name');
  this.ownerId;
  this.pendingOwnerIndicator = document.getElementById('pending-owner')
  this.pendingOwnerId;
  this.totalCost = document.getElementById('total-cost');
  this.splitOption = document.getElementById('split-option');
  this.debtorList = document.getElementById('debtor-list');
  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
Event.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

Event.prototype.updateData = function(eventName, eventId, ownerName, ownerId, 
                                      pendingOwnerId, totalCost, splitOption, debtorList) {
	this.eventName.value = eventName;
  this.eventId = eventId;
  this.ownerName.value = ownerName;
  this.ownerId = ownerId;
  this.pendingOwnerId = pendingOwnerId;
  if (pendingOwnerId) {
    this.pendingOwnerIndicator.removeAttribute('hidden');
  } else{
    this.pendingOwnerIndicator.setAttribute('hidden', 'true');
  }
  this.totalCost.value = totalCost;
  this.splitOption = splitOption;

  //TODO: debtorList
}

// Loads user data.
Event.prototype.attachDataListener = function() {
  // Reference to the /users/ database path.
  var eventId = window.location.href.split('/').pop();
  var refPath = "events/" + eventId;
  this.eventRef = this.database.ref(refPath);
  // Make sure we remove all previous listeners.
  this.eventRef.off();
  this.eventRef.on('value', 
  	function(snapshot) {
  		this.updateData(snapshot.child("eventName").val(),
        snapshot.child(eventId).val(),
        snapshot.child("owner").val(),
        snapshot.child("ownerId").val(),
        snapshot.child("pendingOwnerId").val(),
        snapshot.child("totalCost").val(),
        snapshot.child("splitOption").val(),
  			snapshot.child("debtors").val());
  	},
  	function(errorCode){
  		console.log(errorCode)
  	}
  );
};

// Signs-out.
Event.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
Event.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!

  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    window.location.replace("/dashboard");
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
Event.prototype.checkSignedInWithMessage = function() {
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
};