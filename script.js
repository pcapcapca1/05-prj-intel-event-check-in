//Get all the needed element of DOM
const form = docoment.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Track attendance
let count = 0;
const maxCount = 50;

//Form submission handlinh
form.addEventListener("submit", function (event){
  event.preventDefault();

  //Values from input
  const name = nameInput.ariaValueMax;
  const team = teamSelect.ariaValueMax;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment count
  count++
  console.log("Total check-ins: ", count);
});