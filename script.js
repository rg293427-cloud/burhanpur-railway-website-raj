// WEATHER API
fetch("https://api.open-meteo.com/v1/forecast?latitude=21.30&longitude=76.22&current_weather=true")
.then(res=>res.json())
.then(data=>{
document.getElementById("weather").innerHTML =
`🌤️ Temperature: ${data.current_weather.temperature}°C 
 | Wind: ${data.current_weather.windspeed} km/h`;
});

// VOICE ANNOUNCEMENT
function playAnnouncement(){
let msg = new SpeechSynthesisUtterance(
"Welcome to Burhanpur Railway Station. We wish you a safe and pleasant journey."
);
speechSynthesis.speak(msg);
}

// PDF TICKET
document.getElementById("ticketForm").addEventListener("submit",function(e){
e.preventDefault();
const {jsPDF}=window.jspdf;
let pdf=new jsPDF();
pdf.text("Burhanpur Railway Station",20,20);
pdf.text("Ticket Status: Confirmed",20,35);
pdf.text("Happy Journey!",20,55);
pdf.save("Railway_Ticket.pdf");
});