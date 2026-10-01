//Get all the needed element of DOM
const form = docoment.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Form submission handlinh
form.addEventListener("submit", function (event){
  event.preventDefault();

  //Values from input
  const name = nameInput.ariaValueMax;
  const team = teamSelect.ariaValueMax;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team);
});