// -------------------- WEATHER (DEMO) --------------------
const temp = Math.floor(Math.random() * 10) + 22;
const wind = Math.floor(Math.random() * 6) + 5;

document.getElementById("weather").innerText =
  `🌤️ Temperature: ${temp}°C | Wind: ${wind} km/h`;

// -------------------- COMMON ANNOUNCEMENT --------------------
function speak(text, pitch = 1.2) {
  speechSynthesis.cancel(); // stop previous speech
  let msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  msg.pitch = pitch;
  msg.rate = 0.95; // realistic railway announcement speed
  speechSynthesis.speak(msg);
}

// -------------------- STATION ANNOUNCEMENT --------------------
function playAnnouncement() {
  speak(
    "Welcome to Burhanpur Railway Station. We wish you a safe and pleasant journey."
  );
}

// -------------------- PLATFORM ANNOUNCEMENT --------------------
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

// -------------------- LIVE TRAIN STATUS --------------------
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

// -------------------- PAYMENT METHOD DYNAMIC FIELDS --------------------
document.getElementById("paymentMethod").addEventListener("change", function () {
  let box = document.getElementById("paymentDetails");

  if (this.value === "UPI") {
    box.style.display = "block";
    box.innerHTML = '<input placeholder="Enter UPI ID">';
  } else if (this.value === "Credit Card") {
    box.style.display = "block";
    box.innerHTML =
      '<input placeholder="Card Number">' +
      '<input placeholder="Expiry Date">' +
      '<input placeholder="CVV">';
  } else {
    box.style.display = "none";
    box.innerHTML = "";
  }
});

// -------------------- TICKET FORM SUBMIT --------------------
let ticketData = null;

document.getElementById("ticketForm").addEventListener("submit", function (e) {
  e.preventDefault();

  ticketData = {
    name: document.getElementById("name").value,
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    date: document.querySelector('input[type="date"]').value,
    payment: document.getElementById("paymentMethod").value,
    pnr: "PNR" + Math.floor(Math.random() * 900000 + 100000)
  };

  document.getElementById("previewText").innerHTML =
    "<b>Passenger:</b> " + ticketData.name + "<br>" +
    "<b>From:</b> " + ticketData.from + "<br>" +
    "<b>To:</b> " + ticketData.to + "<br>" +
    "<b>Date:</b> " + ticketData.date + "<br>" +
    "<b>Payment:</b> " + ticketData.payment + "<br>" +
    "<b>PNR:</b> " + ticketData.pnr;

  document.getElementById("ticketModal").style.display = "flex";
});

// -------------------- MODAL CLOSE --------------------
function closeModal() {
  document.getElementById("ticketModal").style.display = "none";
}

// -------------------- DOWNLOAD TICKET PDF --------------------
function downloadTicket() {
  const { jsPDF } = window.jspdf;
  let pdf = new jsPDF();

  pdf.text("Burhanpur Railway Station", 20, 20);
  pdf.text("E-Ticket", 20, 35);
  pdf.text("PNR: " + ticketData.pnr, 20, 50);
  pdf.text("Passenger: " + ticketData.name, 20, 65);
  pdf.text("From: " + ticketData.from, 20, 75);
  pdf.text("To: " + ticketData.to, 20, 85);
  pdf.text("Date: " + ticketData.date, 20, 95);
  pdf.text("Payment: " + ticketData.payment, 20, 105);
  pdf.text("Status: Confirmed", 20, 120);

  pdf.save("Railway_Ticket.pdf");
  closeModal();
}
