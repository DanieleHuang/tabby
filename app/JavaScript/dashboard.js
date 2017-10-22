function updateDashCards(eventList) {
  var cardContainer = document.getElementById("dash_card_container");

  if(eventList == null) {
    return;
  }

  while (cardContainer.childNodes.length > 0) {
    cardContainer.removeChild(cardContainer.lastChild);
  }

  for (newEvent in eventList) {
    let scopedEvent = newEvent;

    var eventObj = eventList[newEvent];
    var newCard = document.createElement("DIV");
    newCard.className = "dashboard_card";


    var newParagraph = document.createElement("P");
    newParagraph.style.color = "white";
    newParagraph.style.fontSize = "28px";

    newParagraph.innerHTML = eventObj.eventName;

    var newPrice = document.createElement("P");
    newPrice.style.color = "white";
    newPrice.style.fontSize = "30px";
    newPrice.innerHTML = "You Pay: $"+ (eventObj.amountPaying.toFixed(2));
    newPrice.style.marginTop = "-15px";
    newCard.style.textAlign = "center";
    newCard.appendChild(newParagraph);
    newCard.appendChild(newPrice);
    cardContainer.appendChild(newCard);

    if(eventObj.ownerEmail == firebase.auth().currentUser.email)
    {
      var trash = document.createElement("IMG");
      var newOwner = document.createElement("P");
      trash.id = "trash_icon";
      newOwner.style.color = "white";
      newOwner.style.float = "left";
      newOwner.style.marginLeft = "130px";
      newOwner.style.marginTop = "-15px";
      newOwner.style.fontSize = "24px";
      newOwner.innerHTML = "(Owner)";
      trash.onclick = () => {deleteEvent(scopedEvent)};
      trash.src = "/Images/delete.png";
      newCard.appendChild(newOwner);
      newCard.appendChild(trash);
      trash.style.width = "40px";
      trash.style.height = "40px";
      trash.style.float = "right";
      trash.style.marginTop = "0px";
      trash.style.marginRight = "10px";
    }
    newCard.onclick = function(event)
    {
      var trash_can = document.getElementById("trash_icon");
      if (event.target != trash_can )
      {
        view_tab(scopedEvent);
      }
    }
  }
}

function deleteEvent(eventId) {
  console.log(eventId);
  var eventRef = firebase.database().ref("events/" + eventId);
  var usersList = [];
  eventRef.once('value').then(function(snapshot){
    var jsObject = snapshot.exportVal();
    console.log(jsObject);
    usersList.push(jsObject.ownerID);
    var debtors = jsObject.debtors;

    if(debtors != null) {
      var memberMap = debtors.members_map;
      if(memberMap != null) {
        for(member in memberMap) {
          usersList.push(member);
        }
      }

      var inviteeMap = debtors.invitee_map;
      if(inviteeMap != null) {
        for(invitee in inviteeMap) {
          usersList.push(invitee);
        }
      }
    }

    console.log(usersList);
    for(idx in usersList) {
      var eventRefPath = "users/" + usersList[idx] + "/eventList/" + eventId;
      console.log(eventRefPath);
      var eventListEventRef = firebase.database().ref(eventRefPath);
      eventListEventRef.remove();
    }
    eventRef.remove();
  });
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
            window.location = "/";
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
  var cardContainer = document.getElementById("dash_card_container");
  if (cardContainer.childNodes.length == 1)
  {
    var servicesText = document.createElement("P");
    servicesText.innerHTML = "Don't have any Tabbs yet? Head over to the Services section to create some!";
    servicesText.style.color = "white";
    servicesText.style.fontSize = "28px";
    servicesText.style.marginLeft = "10%";
    servicesText.style.float = "left";

    var direct_arrow = document.createElement("IMG");
    direct_arrow.src = "/Images/direct_arrow.png";
    direct_arrow.style.float = "right";
    direct_arrow.style.width = "95px";
    direct_arrow.style.height = "150px";
    direct_arrow.style.marginRight = "15%";
    direct_arrow.style.marginTop = "-85px";
    cardContainer.appendChild(servicesText);
    cardContainer.appendChild(direct_arrow);

  }
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
