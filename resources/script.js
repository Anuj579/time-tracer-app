const video = document.getElementById("bgVideo");
video.playbackRate = 0.5; // Set playback speed to half (adjust as needed)

AOS.init({
  duration: 1200,
});

// Adjusting footer

const footer = document.getElementsByTagName('footer')[0];
window.addEventListener('resize', () => {
  if (window.innerHeight > 840) {
    footer.style.position = 'absolute';
  } else {
    footer.style.position = 'relative';
  }
});
if (window.innerHeight > 840) {
  footer.style.position = 'absolute';
} else {
  footer.style.position = 'relative';
}

function startCountdown() {
  const errorMessage = document.getElementById("error-message");
  const resultPara = document.getElementById('time');
  const dateTimeInput = document.getElementById("datetime");
  // converts the user-selected date and time from a string into a Date object
  const selectedDateTime = new Date(dateTimeInput.value);
  // Get the current date and time
  const now = new Date();

  if (dateTimeInput.value) {
    dateTimeInput.classList.remove("datetime-invalid");
    errorMessage.style.opacity = "0";
    errorMessage.style.visibility = "hidden";
    // Compare the selected date and time with the current date and time
    if (selectedDateTime < now) {
      // If the selected time is in the past
      // Calculate the time elapsed since the selected time
      const elapsedTime = now - selectedDateTime;
      // Call the displayResult function to show the result
      displayResult("Since", elapsedTime);
    } else {
      // If the selected time is in the future
      const remainingTime = selectedDateTime - now;
      // Call the displayResult function to show the result
      displayResult("Until", remainingTime);
    }
  } else {
    dateTimeInput.classList.add("datetime-invalid");
    errorMessage.style.opacity = "1";
    errorMessage.style.visibility = "visible";
    resultPara.innerHTML = "00<span>h</span> 00<span>m</span> 00<span>s</span>";
    resultPara.querySelectorAll("span").forEach((span) => {
      if(window.innerWidth> 767){
        span.style.fontSize = "24px";
      }else{
        span.style.fontSize = "18px";
      }
    });
  }
}

function displayResult(label, time) {
  // Get the container where the result label will be displayed
  const timeLabel = document.getElementById("timeLabel");
  // Get the container where the result will be displayed
  const timeContainer = document.getElementById("time");

  // Calculate days, hours, minutes, and seconds from the time in milliseconds
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  // Create a string with the result message
  const resultMessage = `${days} days, ${hours}<span>h</span> ${minutes}<span>m</span> ${seconds}<span>s</span>`;
  
  // Update the inner HTML of the result container with the result message
  timeContainer.innerHTML = resultMessage;


  // Check if the time is in the past or the future and update the label accordingly
  if (label === "Since") {
    timeLabel.textContent = "Time Since Selected Time:";
  } else {
    timeLabel.textContent = "Time left until selected time:";
  }
}
