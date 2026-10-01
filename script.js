//Get all the needed element of DOM
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Track attendance
let count = 0;
const maxCount = 50;

//Form submission handlinh
form.addEventListener("submit", function (event){
  event.preventDefault();

  //Values from input
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment count
  count++;
  console.log("Total check-ins: ", count);

  //Progress bar update
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);

  //Team count update
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //Welcome message
  const message = `Welcome!!! ${name} from ${teamName}`;
  console.log(message);
});