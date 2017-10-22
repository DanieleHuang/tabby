// Initializes Event.
function Event() {
  // Shortcuts to DOM Elements.
  this.eventNameElement = document.getElementById('event-name');
  this.eventId;
  this.ownerNameElement = document.getElementById('owner-name');
  this.ownerId;
  //this.pendingOwnerIndicatorElement = document.getElementById('pending-owner')
  //this.pendingOwnerId;
  this.totalCostElement = document.getElementById('total-cost');
  //this.splitOptionElement = document.getElementById('split-option');
  this.debtorListElement = document.getElementById('debtor-list');
  this.debtorList;
  this.initFirebase();
}

Event.prototype.addDebtor = function(person, val) { 
  if (this.debtorList == null) {
    this.debtorList = {person:val};
  } else {
    this.debtorList[person] = val;
  }
  var updates = {};
  updates[this.eventRef.child('debtors')] = debtorList;

  firebase.database().ref().update(updates);
}

Event.prototype.removeDebtor = function(person) { 
  delete this.debtorList[person];
  var updates = {};
  updates[this.eventRef.child('debtors')] = debtorList;

  firebase.database().ref().update(updates);
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
Event.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();

  this.attachDataListener();

  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

Event.prototype.updatePageData = function(eventName, eventId, ownerName, ownerId, 
                                      pendingOwnerId, totalCost, splitOption, debtorList) {
	this.eventNameElement.value = eventName;
  this.eventId = eventId;
  this.ownerNameElement.value = ownerName;
  this.ownerId = ownerId;
  this.pendingOwnerId = pendingOwnerId;
  if (pendingOwnerId) {
    this.pendingOwnerIndicator.removeAttribute('hidden');
  } else{
    this.pendingOwnerIndicator.setAttribute('hidden', 'true');
  }
  this.totalCostElement.value = totalCost;
  this.splitOption = splitOption;
  this.debtorList = debtorList;
  while(this.debtorListElement.childNodes.length > 0) {
    this.debtorListElement.removeChild(debtorListElement.lastChild);
  }
  for (x in debtorList) {
    var newDiv = document.createElement("DIV"); //TODO
    newDiv.innerHTML = x + " " + debtorList[x];
    debtorListElement.appendChild(newDiv);
  }
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
  		this.updatePageData(snapshot.child("eventName").val(),
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
  window.dashboard = new Event();
};