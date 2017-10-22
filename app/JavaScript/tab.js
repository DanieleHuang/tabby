function view_tab() {

	var modal = document.getElementById('create_tab_modal');
	var modal_content = document.getElementsByClassName('create_tab_modal_content')[0];
	var span = document.getElementsByClassName("close")[0];

	modal.style.display = "block";
	modal_content.style.display = "block";
	console.log("displaying modal");

	span.onclick = function() {
      modal.style.display = "none";
      modal_content.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById('tab_modal');

  if (event.target == modal) {
      modal.style.display = "none";
  }
}
