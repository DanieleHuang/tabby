function updateDashCards(eventList) {
  console.log(eventList);
  var cardContainer = document.getElementById("dash_card_container");
  while (cardContainer.childNodes.length > 0) {
    cardContainer.removeChild(cardContainer.lastChild);
  }

  if(eventList == null) {
    return;
  }

  for (event in eventList) {
    var eventObj = eventList[event];
    console.log(eventObj);
    var newCard = document.createElement("DIV");
    newCard.className = "dashboard_card";
    newCard.onclick = () => {view_tab()};

    var newParagraph = document.createElement("P");
    newParagraph.innerHTML = eventObj.eventName;
    if(eventObj.ownerEmail == firebase.auth().currentUser.email) {
      newParagraph.innerHTML = newParagraph.innerHTML + '\n' + "(Owner)"

    }
    newParagraph.innerHTML = newParagraph.innerHTML + '\n' + "$"+ (eventObj.amountPaying.toFixed(2));
    newCard.style.textAlign = "center";
    newCard.appendChild(newParagraph);
    cardContainer.appendChild(newCard);
    if(eventObj.ownerEmail == firebase.auth().currentUser.email)
    {
      var trash = document.createElement("IMG");
      trash.src = "/Images/delete.png";
      newCard.appendChild(trash);
      trash.style.width = "40px";
      trash.style.height = "40px";
      trash.style.float = "right";
      trash.style.marginTop = "100px";
      trash.style.marginRight = "10px";
    }
  }

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
      attachDataListener();
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

// Loads user data.
function attachDataListener() {
  // Reference to the /users/ database path.
  var refPath = "users/" + emailToURL(firebase.auth().currentUser.email);
  var userRef = firebase.database().ref(refPath);
  // Make sure we remove all previous listeners.
  userRef.off();
  userRef.on('value',
  	function(snapshot) {
  		updateDashCards(snapshot.child("eventList").val());
  	},
  	function(errorCode){
  		console.log(errorCode)
  	}
  );
};

function emailToURL(email) {
  return email.replace(/\./g,'-');
}
