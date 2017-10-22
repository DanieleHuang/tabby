function view_tab(event_id) {

	attachEventDataListener(event_id);

	var modal = document.getElementById('create_tab_modal');
	var modal_content = document.getElementsByClassName('create_tab_modal_content')[0];
	var span = document.getElementsByClassName("close")[0];

	modal.style.display = "block";
	modal_content.style.display = "none";

	span.onclick = function() {
      modal.style.display = "none";
      modal_content.style.display = "none";
    }
}


function attachEventDataListener(event_id) {

	var participants_cost = document.getElementById("participants_cost");

	while (participants_cost.childNodes.length > 2)
	{
		participants_cost.removeChild(participants_cost.lastChild);
	}
  // Reference to the /users/ database path.
  var refPath = "events/" + event_id;
  var userRef = firebase.database().ref(refPath);
  // Make sure we remove all previous listeners.

  userRef.off();
  userRef.on('value',
  	function(snapshot) {
			var eventObject = snapshot.exportVal();
			var modal_title = document.getElementById("modal_title");
			modal_title.innerHTML = eventObject.eventName;

			var owner = document.getElementById("owner");
			owner.innerHTML = eventObject.owner;
			if (eventObject.ownerID == emailToURL(firebase.auth().currentUser.email))
			{
				owner.innerHTML += " (Me!)";
			}

			var count = 1;

			var memberDiv = document.createElement("P");
			memberDiv.style.color = "white";
			memberDiv.style.fontSize = "18px";
			memberDiv.innerHTML = eventObject.owner;
			memberDiv.style.marginLeft = "25px";
			participants_cost.appendChild(memberDiv);

			var total_cost = document.getElementById("total_cost");
			total_cost.innerHTML = "$" + eventObject.totalCost;

			var debtors = eventObject.debtors;
			if(debtors != null) {
	      var memberMap = debtors.members_map;
	      if(memberMap != null) {

	        for(idx in memberMap) {
							var memberDiv = document.createElement("P");
							memberDiv.style.color = "white";
							memberDiv.style.marginTop = "-15px";
							memberDiv.style.fontSize = "18px";
							memberDiv.innerHTML = memberMap[idx][0];
							memberDiv.style.marginLeft = "25px";
							participants_cost.appendChild(memberDiv);
							count++;
	        }
	      }

	      var inviteeMap = debtors.invitee_map;
	      if(inviteeMap != null) {
	        for(idx in inviteeMap) {
						var memberDiv = document.createElement("P");
						memberDiv.style.color = "white";
						memberDiv.style.marginTop = "-15px";
						memberDiv.style.fontSize = "18px";
						memberDiv.innerHTML = inviteeMap[idx][0];
						memberDiv.style.marginLeft = "25px";
						participants_cost.appendChild(memberDiv);
						count++;
	        }
	      }

				var owes = document.getElementById("owes");
				owes.innerHTML = "$" + parseFloat(parseFloat(eventObject.totalCost) / parseFloat(count)).toFixed(2) + " / person";

				var modal_content = document.getElementsByClassName('create_tab_modal_content')[0];
				modal_content.style.display = "block";
	    }
  	},
  	function(errorCode){
  		console.log(errorCode)
  	}
  );
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById('tab_modal');

  if (event.target == modal) {
      modal.style.display = "none";
  }
}
