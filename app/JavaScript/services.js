/* File Name: services.js
 */

var spotify_payment = ["Spotify Premium Monthly - $9.99", "Spotify Family Monthly - $14.99"];
var amazon_payment = ["Amazon Prime Monthly Video Membership - $8.99", "Amazon Prime Monthly - $10.99", "Amazon Prime Yearly - $99"];
var netflix_payment = ["Netflix Basic Monthly - $7.99", "Netflix Standard Monthly - $10.99", "Netflix Premium Monthly - $13.99"];
var hulu_payment = ["Hulu 1st Year Monthly - $5.99", "Hulu Monthly - $7.99", "Hulu with Live TV Monthly - $39.99"];
var hbo_payment = ["HBO Now Student Monthly - $9.99", "HBO Now Monthly - $14.99"];
var nfl_payment = ["NFL Game Pass Yearly - $99"];
var nba_payment = ["NBA One Team - $17.99", "NBA All Teams Monthly - $28.99", "NBA All Teams + More Monthly - $39.99"];
var mlb_payment = ["MLB.TV Premium Monthly - $24.99", "MLB.TV Premium Yearly - $129.99", "MLB.TV Basic Monthly - $19.99", "MLB.TV Basic Yearly - $109.99"];

function setup_services()
{
  var signout_heading = document.getElementById("signout_heading");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      signout_heading.innerHTML = user.email;
      signout_heading.style.cursor = "pointer";
      signout_heading.onclick = function()
      {
        var signout_dropdown = document.getElementById("signout_dropdown");
        signout_dropdown.style.display = "block";
        signout_dropdown.style.cursor = "pointer";
        signout_dropdown.className += " hover_div";
        signout_heading.onclick = function()
        {
          signout_dropdown_hide(signout_heading, signout_dropdown);
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
      console.log("here");
      signout_heading.onclick = function()
      {
        window.location = "/login";
      }
    }
  });
}

function signout_dropdown_hide(signout_heading, signout_dropdown)
{
  signout_dropdown.style.display = "none";
  signout_heading.onclick = function()
  {
    signout_dropdown.style.display = "block";
    signout_heading.onclick = function()
    {
      signout_dropdown_hide(signout_heading, signout_dropdown);
    }
  }
}

function open_modal(type, deepColor, backgroundColor)
{
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
      content[i].style.borderColor = deepColor;
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

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {

  var modal = document.getElementById('myModal');

  if (event.target == modal) {
      modal.style.display = "none";
  }
}
