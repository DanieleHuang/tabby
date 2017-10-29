/* File Name: services.js
 */
 var spotify_payment = ["Spotify Premium Student Monthly - $4.99", "Spotify Premium Monthly - $9.99", "Spotify Family Monthly - $14.99"];
var amazon_payment = ["Amazon Prime Monthly Video Membership - $8.99", "Amazon Prime Monthly - $10.99", "Amazon Prime Yearly - $99"];
var netflix_payment = ["Netflix Basic Monthly - $7.99", "Netflix Standard Monthly - $10.99", "Netflix Premium Monthly - $13.99"];
var hulu_payment = ["Hulu 1st Year Monthly - $5.99", "Hulu Monthly - $7.99", "Hulu with Live TV Monthly - $39.99"];
var hbo_payment = ["HBO Now Student Monthly - $9.99", "HBO Now Monthly - $14.99"];
var nfl_payment = ["NFL Game Pass Yearly - $99"];
var nba_payment = ["NBA One Team - $17.99", "NBA All Teams Monthly - $28.99", "NBA All Teams + More Monthly - $39.99"];
var mlb_payment = ["MLB.TV Premium Monthly - $24.99", "MLB.TV Premium Yearly - $129.99", "MLB.TV Basic Monthly - $19.99", "MLB.TV Basic Yearly - $109.99"];

var custom_bar = ["custom"];
var spotify_bar = ["spotify"];
var amazon_bar = ["amazon"];
var netflix_bar = ["netflix"];
var hulu_bar = ["hulu"];
var hbo_bar = ["hbo"];
var nfl_bar = ["nfl"];
var nba_bar = ["nba"];
var mlb_bar = ["mlb"];

var search_bar = [custom_bar, spotify_bar, amazon_bar, netflix_bar, hulu_bar, hbo_bar, nfl_bar, nba_bar, mlb_bar];

document.getElementById("search_bar").addEventListener('input', displaySearch);

function displaySearch()
{
  var service_images = document.getElementsByClassName("service_images");
  var search_bar_value = document.getElementById("search_bar").value;
  if (search_bar_value == "")
  {
    for (var i = 0; i < service_images.length; i++)
    {
      service_images[i].style.display = "inline";
    }
    return;
  }
  for (var i = 0; i < service_images.length; i++)
  {
    service_images[i].style.display = "none";
  }
  for (var i = 0; i < search_bar.length; i++)
  {
      for (var j = 0; j < search_bar[i].length; j++)
      {
        if (search_bar[i][j].toUpperCase().startsWith(search_bar_value.toUpperCase()))
        {
          service_images[i].style.display = "inline";
        }
      }
  }


  if (search_bar_value.toUpperCase() == "spotify".toUpperCase())
  {
    service_images[1].style.display = "inline";

  }
}


function setup_services()
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

function open_modal(type, deepColor, backgroundColor)
{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
  var modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  var content = document.getElementsByClassName("modal-content");
  var content_none = document.getElementsByClassName("modal-content-none");
  var modal_title = document.getElementById("modal_title");
  var modal_payment = document.getElementById("modal_payment");

    modal.style.display = "block";
    modal_title.style.color = "white";
    for (var i = 0; i < content.length; i++)
    {
      content[i].style.display = "block";
      content[i].style.color = "white";
      content[i].style.backgroundColor = deepColor;
    }

    var modal_users = document.getElementsByClassName("modal-content-users");
    for (var i = 0; i < modal_users.length; i++)
    {
      modal_users[i].style.display = "block";
    }

    for (var i = 0; i < content_none.length; i++)
    {
      content_none[i].style.display = "block";
      content_none[i].style.color = "white";
      content_none[i].style.borderColor = deepColor;
    }
    span.style.color = "white";
    modal_title.innerHTML = type;

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
      var dropdown_parent = document.getElementById("dropdown_parent");

      while (dropdown_parent.childNodes.length > 1)
      {
        dropdown_parent.removeChild(dropdown_parent.lastChild);
      }
    }

    modal_payment.style.backgroundColor = "grey";
    modal_payment.style.width = "80%";
    modal_payment.style.padding = "10px 20px 10px 20px";

    populate_modal(type);

  }else {
          window.location = "/login";
          return;
  }
});

}

function populate_modal(type)
{
  var modal_payment = document.getElementById("modal_payment");

  var dropdown_parent = document.getElementById("dropdown_parent");

  while (dropdown_parent.childNodes.length > 1)
  {
    dropdown_parent.removeChild(dropdown_parent.lastChild);
  }

  reset_modal_payments();

  switch(type)
  {
    case 'Spotify':
      for (var i = 0; i < spotify_payment.length; i++)
      {
        var link = document.createElement("DIV");
        link.className += " dropdown_div";
        link.innerHTML = spotify_payment[i];
        let val = spotify_payment[i];
        dropdown_parent.appendChild(link);
        link.onclick = function()
        {
          var dropdown = document.getElementById("dropdown");
          modal_payment.innerHTML = val;
          var dropdown_content = document.getElementsByClassName("dropdown-content");

          for (var i = 0; i < dropdown_content.length; i++)
          {
            dropdown_content[i].style.display = "none";
          }
        }
      }
      break;
    case 'Amazon':
      for (var i = 0; i < amazon_payment.length; i++)
      {
        var link = document.createElement("DIV");
        link.className += " dropdown_div";
        link.innerHTML = amazon_payment[i];
        let val = amazon_payment[i];
        dropdown_parent.appendChild(link);
        link.onclick = function()
        {
          var dropdown = document.getElementById("dropdown");
          modal_payment.innerHTML = val;
          var dropdown_content = document.getElementsByClassName("dropdown-content");

          for (var i = 0; i < dropdown_content.length; i++)
          {
            dropdown_content[i].style.display = "none";
          }
        }
      }
      break;
    case 'Netflix':
      for (var i = 0; i < netflix_payment.length; i++)
      {
        var link = document.createElement("DIV");
        link.className += " dropdown_div";
        link.innerHTML = netflix_payment[i];
        let val = netflix_payment[i];
        dropdown_parent.appendChild(link);
        link.onclick = function()
        {
          var dropdown = document.getElementById("dropdown");
          modal_payment.innerHTML = val;
          var dropdown_content = document.getElementsByClassName("dropdown-content");

          for (var i = 0; i < dropdown_content.length; i++)
          {
            dropdown_content[i].style.display = "none";
          }
        }
      }
      break;
    case 'Hulu':
      for (var i = 0; i < hulu_payment.length; i++)
      {
        var link = document.createElement("DIV");
        link.className += " dropdown_div";
        link.innerHTML = hulu_payment[i];
        let val = hulu_payment[i];
        dropdown_parent.appendChild(link);
        link.onclick = function()
        {
          var dropdown = document.getElementById("dropdown");
          modal_payment.innerHTML = val;
          var dropdown_content = document.getElementsByClassName("dropdown-content");

          for (var i = 0; i < dropdown_content.length; i++)
          {
            dropdown_content[i].style.display = "none";
          }
        }
      }
      break;
    case 'HBO':
      for (var i = 0; i < hbo_payment.length; i++)
      {
        var link = document.createElement("DIV");
        link.className += " dropdown_div";
        link.innerHTML = hbo_payment[i];
        let val = hbo_payment[i];
        dropdown_parent.appendChild(link);
        link.onclick = function()
        {
          var dropdown = document.getElementById("dropdown");
          modal_payment.innerHTML = val;
          var dropdown_content = document.getElementsByClassName("dropdown-content");

          for (var i = 0; i < dropdown_content.length; i++)
          {
            dropdown_content[i].style.display = "none";
          }
        }
      }
      break;
    case 'NFL Game Pass':
      for (var i = 0; i < nfl_payment.length; i++)
      {
        var link = document.createElement("DIV");
        link.className += " dropdown_div";
        link.innerHTML = nfl_payment[i];
        let val = nfl_payment[i];
        dropdown_parent.appendChild(link);
        link.onclick = function()
        {
          var dropdown = document.getElementById("dropdown");
          modal_payment.innerHTML = val;
          var dropdown_content = document.getElementsByClassName("dropdown-content");

          for (var i = 0; i < dropdown_content.length; i++)
          {
            dropdown_content[i].style.display = "none";
          }
        }
      }
      break;
    case 'NBA League Pass':
      for (var i = 0; i < nba_payment.length; i++)
      {
        var link = document.createElement("DIV");
        link.className += " dropdown_div";
        link.innerHTML = nba_payment[i];
        let val = nba_payment[i];
        dropdown_parent.appendChild(link);
        link.onclick = function()
        {
          var dropdown = document.getElementById("dropdown");
          modal_payment.innerHTML = val;
          var dropdown_content = document.getElementsByClassName("dropdown-content");

          for (var i = 0; i < dropdown_content.length; i++)
          {
            dropdown_content[i].style.display = "none";
          }
        }
      }
      break;
    case 'MLB TV':
      for (var i = 0; i < mlb_payment.length; i++)
      {
        var link = document.createElement("DIV");
        link.className += " dropdown_div";
        link.innerHTML = mlb_payment[i];
        let val = mlb_payment[i];
        dropdown_parent.appendChild(link);
        link.onclick = function()
        {
          var dropdown = document.getElementById("dropdown");
          modal_payment.innerHTML = val;
          var dropdown_content = document.getElementsByClassName("dropdown-content");

          for (var i = 0; i < dropdown_content.length; i++)
          {
            dropdown_content[i].style.display = "none";
          }
        }
      }
      break;
    case 'Custom':
  /*    var tag = document.getElementById("tag_parent");
      var dropdown = document.getElementById("dropdown");

      var name_input = document.createElement("INPUT");
      name_input.className += " modal-content-users";
      tag.insertBefore(name_input, dropdown);
      tag.removeChild(dropdown);
*/
      break;
    default:
      break;
  }
}

function reset_modal_payments()
{
  modal_payment.innerHTML = "Payment Plan";
  var dropdown_content = document.getElementsByClassName("dropdown-content");
  modal_payment.onclick = function()
  {
    for (var i = 0; i < dropdown_content.length; i++)
    {
      dropdown_content[i].style.display = "block";
    }
    document.onmouseout = function(event)
    {
      if (event.target != modal_payment)
      {
        for (var i = 0; i < dropdown_content.length; i++)
        {
          if (event.target == dropdown_content[i])
          {
            return;
          }
        }
      }
    }
  }
}

function emailToURL(email) {
  return email.replace(/\./g,'-').toLowerCase();
}

function create_tab() {
  var database = firebase.database();
  var new_key = database.ref().child('events').push().key;
  var updates = {};

  var members_map = {};
  var invitee_map = {};
  var debtors_map = {members_map, invitee_map};

  var owner_id = emailToURL(firebase.auth().currentUser.email);
  var owner = firebase.auth().currentUser.displayName;

  var payment = document.getElementById("modal_payment").innerHTML;
  var event_name = payment.split(" ")[0];
  var total_cost = parseFloat(payment.split(" - $")[1]);

  var mem_string = document.getElementById("modal_users").value;

  var members = mem_string.split(",");

  var currUserEmail = firebase.auth().currentUser.email;
  while(members.indexOf(currUserEmail) != -1) {
    members.splice(members.indexOf(currUserEmail));
  }
  console.log(members);
  console.log(mem_string);

  if(mem_string.length == 0 || members.length == 0) {

    var new_event = {
      eventName: event_name,
      owner: owner,
      ownerID: owner_id,
      totalCost: total_cost,
      debtors: debtors_map
    }

    updates['/events/' + new_key] = new_event;

    var new_person_event = {
      membersAmount: Object.keys(members_map).length + Object.keys(invitee_map).length + 1,
      owner: owner,
      ownerEmail: firebase.auth().currentUser.email,
      eventName: event_name,
      amountPaying: total_cost
    };

    var owner_key = '/users/' + emailToURL(firebase.auth().currentUser.email) +'/eventList/' + new_key;
    updates[owner_key] = new_person_event;

    database.ref().update(updates);

    var modal = document.getElementById('myModal');
    modal.style.display = "none";

    return;
  }

  var split_cost = total_cost/(members.length+1);
  if(isNaN(split_cost)) {
    return;
  }

  var users_ref = database.ref('users');

  var counter = 0;

  for(var i=0; i<members.length; i++) {
    specific_ref = users_ref.child(emailToURL(members[i].trim()));
    specific_ref.once("value")
      .then(function(snapshot) {
        if(!snapshot.exists()) {
          alert(snapshot.key + " does not exist. An invite has been sent to them to join Tabby!");
          invitee_map[snapshot.key] = [snapshot.val().name,split_cost];
        } else {
          members_map[snapshot.key] = [snapshot.val().name,split_cost];
           $.ajax({
              url: '/send_sms',
              method: 'POST',
              dataType: 'json',
              data: {
                  phoneNumber: snapshot.val().phoneNumber,
                  message: "You have a new monthly payment of $" + split_cost.toFixed(2) + " to " + owner + "."
              }
          }).done(function(data) {
              // The JSON sent back from the server will contain a success message
              console.log(data);
          }).fail(function(error) {
              console.log(JSON.stringify(error));
          });
        }

        counter++;

        if(counter == members.length) {
          var new_event = {
            eventName: event_name,
            owner: owner,
            ownerID: owner_id,
            totalCost: total_cost,
            debtors: debtors_map
          }

          updates['/events/' + new_key] = new_event;

          var new_person_event = {
            membersAmount: members.length + 1,
            owner: owner,
            ownerEmail: firebase.auth().currentUser.email,
            eventName: event_name,
            amountPaying: split_cost
          }

          for(person in members_map) {
            var new_person_key = '/users/' + person + '/eventList/' + new_key;
            updates[new_person_key] = new_person_event;
          }

          var owner_key = '/users/' + emailToURL(firebase.auth().currentUser.email) +'/eventList/' + new_key;
          updates[owner_key] = new_person_event;

          database.ref().update(updates);
        }
      });
  }

  var modal = document.getElementById('myModal');
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {

  var modal = document.getElementById('myModal');

  if (event.target == modal) {
      modal.style.display = "none";
  }
}
