/* File Name: services.js
 */



function open_modal(type, deepColor, backgroundColor)
{
  var modal = document.getElementById('myModal');


  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  var content = document.getElementsByClassName("modal-content");
  var modal_title = document.getElementById("modal_title");

    modal.style.display = "block";
    modal_title.style.color = deepColor;
    for (var i = 0; i < content.length; i++)
    {
      content[i].style.display = "block";
      content[i].style.color = deepColor;
      content[i].style.borderColor = deepColor;
      content[i].style.backgroundColor = "#E8E8EE";
    }
    span.style.color = deepColor;
    modal_title.innerHTML = type;

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}
