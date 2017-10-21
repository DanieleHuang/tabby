/* File Name: services.js
 */



function open_modal(type, deepColor, backgroundColor)
{
  var modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  var content = document.getElementsByClassName("modal-content");
  var content_none = document.getElementsByClassName("modal-content-none");
  var modal_title = document.getElementById("modal_title");

    modal.style.display = "block";
    modal_title.style.color = "white";
    for (var i = 0; i < content.length; i++)
    {
      content[i].style.display = "block";
      content[i].style.color = "white";
      content[i].style.borderColor = deepColor;
      content[i].style.backgroundColor = deepColor;
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
    }

    populate_modal(type);
}

function populate_modal(type)
{
  switch(type)
  {
    case 'Spotify':
      break;
    case 'Amazon':
      break;
    case 'Netflix':
      break;
    case 'Hulu':
      break;
    case 'HBO':
      break;
    case 'NFL Game Pass':
      break;
    case 'NBA League Pass':
      break;
    case 'MLB TV':
      break;
    case 'Custom':
      break;
    default:
      break;
  }
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}
