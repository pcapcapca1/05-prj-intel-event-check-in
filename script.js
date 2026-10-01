//Get all the needed element of DOM
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const celebration = document.getElementById("celebration");
const attendeeList = document.getElementById("attendeeList");
const checkInButton = document.getElementById("checkInBtn");

//Track attendance
const maxCount = 50;
let count = parseInt(localStorage.getItem("attendanceCount"), 10) || 0;
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

//Load saved attendance counts
attendeeCount.textContent = count;
checkInButton.disabled = count >= maxCount;
document.getElementById("waterCount").textContent =
  localStorage.getItem("waterCount") || 0;
document.getElementById("zeroCount").textContent =
  localStorage.getItem("zeroCount") || 0;
document.getElementById("powerCount").textContent =
  localStorage.getItem("powerCount") || 0;

const savedPercentage = Math.round((count / maxCount) * 100) + "%";
progressBar.style.width = savedPercentage;

function displayAttendees() {
  attendeeList.innerHTML = "";

  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    const listItem = document.createElement("li");
    const attendeeName = document.createElement("span");
    const attendeeTeam = document.createElement("span");

    attendeeName.className = "attendee-name";
    attendeeName.textContent = attendee.name;
    attendeeTeam.className = "attendee-team";
    attendeeTeam.textContent = attendee.team;

    listItem.appendChild(attendeeName);
    listItem.appendChild(attendeeTeam);
    attendeeList.appendChild(listItem);
  }
}

displayAttendees();

//Form submission handling
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (count >= maxCount) {
    celebration.textContent = "Check-in is closed. The event is full.";
    celebration.classList.add("success-message");
    celebration.style.display = "block";
    return;
  }

  //Values from input
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment count
  count++;
  attendeeCount.textContent = count;
  localStorage.setItem("attendanceCount", count);
  console.log("Total check-ins: ", count);

  //Progress bar update
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  //Team count update
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;
  localStorage.setItem(team + "Count", teamCounter.textContent);

  attendees.push({ name: name, team: teamName });
  localStorage.setItem("attendees", JSON.stringify(attendees));
  displayAttendees();

  //Welcome message
  const message = `Welcome!!! ${name} from ${teamName}`;
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  //Celebrate when the attendance goal is reached
  if (count === maxCount) {
    checkInButton.disabled = true;
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent,
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent,
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent,
    );
    let winningTeam = "Water Wise";
    let winningCount = waterCount;

    if (zeroCount > winningCount) {
      winningTeam = "Net Zero";
      winningCount = zeroCount;
    }

    if (powerCount > winningCount) {
      winningTeam = "Renewables";
      winningCount = powerCount;
    }

    celebration.textContent = `CONGRATULATIONS! ${winningTeam} is the winning team with ${winningCount} attendees!`;
    celebration.classList.add("success-message");
    celebration.style.display = "block";
  }

  console.log(message);

  //Reset form for next attendee
  form.reset();
});
