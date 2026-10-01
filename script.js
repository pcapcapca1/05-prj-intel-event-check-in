//Get all the needed element of DOM
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

//Track attendance
let count = 0;
const maxCount = 50;

//Form submission handlinh
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Values from input
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment count
  count++;
  attendeeCount.textContent = count;
  console.log("Total check-ins: ", count);

  //Progress bar update
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  //Team count update
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //Welcome message
  const message = `Welcome!!! ${name} from ${teamName}`;
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  //Celebrate when the attendance goal is reached
  if (count === maxCount) {
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent,
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent,
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent,
    );
    let winningTeam = "Team Water Wise";
    let winningCount = waterCount;

    if (zeroCount > winningCount) {
      winningTeam = "Team Net Zero";
      winningCount = zeroCount;
    }

    if (powerCount > winningCount) {
      winningTeam = "Team Renewables";
      winningCount = powerCount;
    }

    greeting.textContent = `Celebration! ${winningTeam} is the winning team with ${winningCount} attendees!`;
  }

  console.log(message);

  //Reset form for next attendee
  form.reset();
});
