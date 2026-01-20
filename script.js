// WEATHER (DEMO)
document.getElementById("weather").innerText =
"🌤️ Temperature: 23°C | Wind: 8 km/h";

// COMMON ANNOUNCEMENT FUNCTION (OVERLAP FIX)
function speak(text, pitch = 1.2) {
  speechSynthesis.cancel(); // stop previous speech
  let msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  msg.pitch = pitch;
  speechSynthesis.speak(msg);
}

// STATION ANNOUNCEMENT
function playAnnouncement() {
  speak(
    "Welcome to Burhanpur Railway Station. We wish you a safe and pleasant journey."
  );
}

// PLATFORM ANNOUNCEMENT (TRAIN BASED)
function platformAnnouncement() {
  let train = document.getElementById("trainSelect").value;
  let text = "";

  if (train === "Punjab Mail")
    text = "Attention please. Punjab Mail is arriving on platform number one.";
  else if (train === "Tapti Ganga")
    text = "Attention please. Tapti Ganga Express is arriving on platform number two.";
  else if (train === "Narmada")
    text = "Attention please. Narmada Express is arriving on platform number three.";
  else {
    alert("Please select a train first");
    return;
  }

  speak(text, 1.3);
}

// LIVE TRAIN STATUS
document.getElementById("trainSelect").addEventListener("change", function () {
  let r = document.getElementById("trainResult");

  if (this.value === "Punjab Mail")
    r.innerText = "🚆 Punjab Mail | Platform 1 | 10:30 AM";
  else if (this.value === "Tapti Ganga")
    r.innerText = "🚆 Tapti Ganga Express | Platform 2 | 2:15 PM";
  else if (this.value === "Narmada")
    r.innerText = "🚆 Narmada Express | Platform 3 | 6:45 PM";
  else r.innerText = "";
});

let ticketData = null;

document.getElementById("ticketForm").addEventListener("submit", function (e) {
  e.preventDefault();

  ticketData = {
    name: document.getElementById("name").value,
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    pnr: "PNR" + Math.floor(Math.random() * 900000 + 100000)
  };

  document.getElementById("previewText").innerHTML =
    "<b>Passenger:</b> " + ticketData.name + "<br>" +
    "<b>From:</b> " + ticketData.from + "<br>" +
    "<b>To:</b> " + ticketData.to + "<br>" +
    "<b>PNR:</b> " + ticketData.pnr;

  document.getElementById("ticketModal").style.display = "flex";
});

function closeModal() {
  document.getElementById("ticketModal").style.display = "none";
}

function downloadTicket() {
  const { jsPDF } = window.jspdf;
  let pdf = new jsPDF();

  pdf.text("Burhanpur Railway Station", 20, 20);
  pdf.text("E-Ticket", 20, 35);
  pdf.text("PNR: " + ticketData.pnr, 20, 50);
  pdf.text("Passenger: " + ticketData.name, 20, 65);
  pdf.text("From: " + ticketData.from, 20, 75);
  pdf.text("To: " + ticketData.to, 20, 85);
  pdf.text("Status: Confirmed", 20, 100);

  pdf.save("Railway_Ticket.pdf");
  closeModal();
}
