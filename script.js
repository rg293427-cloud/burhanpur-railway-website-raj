// WEATHER
fetch("https://api.open-meteo.com/v1/forecast?latitude=21.30&longitude=76.22&current_weather=true")
.then(res=>res.json())
.then(data=>{
  document.getElementById("weather").innerHTML =
  🌤️ ${data.current_weather.temperature}°C | 💨 ${data.current_weather.windspeed} km/h;
});

// ANNOUNCEMENT
function playAnnouncement(){
  speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      "Welcome to Burhanpur Railway Station. Have a safe journey."
    )
  );
}

// PLATFORM ANNOUNCEMENT
function platformAnnouncement(){
  speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      "Attention please. Kamayani Express will arrive on platform number two."
    )
  );
}

// SEARCH
document.getElementById("trainSearch").addEventListener("keyup",function(){
  let v=this.value.toLowerCase();
  document.querySelectorAll(".train-table tr").forEach((r,i)=>{
    if(i===0)return;
    r.style.display=r.innerText.toLowerCase().includes(v)?"":"none";
  });
});

// CONTACT
document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("contactStatus").innerText="✅ Message sent successfully";
  e.target.reset();
});
