document.getElementById("startButton").addEventListener("click", () => {
  const hour = parseInt(document.getElementById("hour").value, 10);
  const minute = parseInt(document.getElementById("minute").value, 10);
  const second = parseInt(document.getElementById("second").value, 10);
  const millisecond = parseInt(
    document.getElementById("millisecond").value,
    10
  );
  const button = document.getElementById("startButton");
  button.disabled = true;

  if (chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ hour, minute, second, millisecond }, () => {
      const delay = calculateDelay(hour, minute, second, millisecond);
      chrome.alarms.create("performClick", { when: Date.now() + delay });
      updateStatus("Scheduled", delay);
      startCountdown(delay);
    });
  } else {
    console.error("chrome.storage.local is not available");
    updateStatus("Error: chrome.storage.local is not available", 0);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  function setDefaultTime() {
    const now = new Date();
    const startOfHour = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      0,
      0,
      0
    );

    document.getElementById("hour").value = startOfHour.getHours();
    document.getElementById("minute").value = startOfHour.getMinutes();
    document.getElementById("second").value = startOfHour.getSeconds();
    document.getElementById("millisecond").value =
      startOfHour.getMilliseconds();
  }

  setDefaultTime();
});
document.getElementById("stopButton").addEventListener("click", () => {
  chrome.alarms.clear("performClick", (wasCleared) => {
    if (wasCleared) {
      updateStatus("Stopped", 0);
      clearCountdown();
    } else {
      updateStatus("Error: Could not stop the task", 0);
    }
  });
});

function calculateDelay(hour, minute, second, millisecond) {
  const now = new Date();
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    second,
    millisecond
  );
  if (targetTime <= now) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  return targetTime.getTime() - now.getTime();
}

function updateStatus(status, delay) {
  document.getElementById("statusMessage").textContent = `Status: ${status}`;
  document.getElementById("countdown").textContent = `Countdown: ${formatTime(
    delay
  )}`;
}

function startCountdown(delay) {
  const countdownElement = document.getElementById("countdown");
  const intervalId = setInterval(() => {
    delay -= 1000;
    if (delay <= 0) {
      clearInterval(intervalId);
      countdownElement.textContent = "Countdown: --:--:--";
    } else {
      countdownElement.textContent = `Countdown: ${formatTime(delay)}`;
    }
  }, 1000);
}

function clearCountdown() {
  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = "Countdown: --:--:--";
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function updateCurrentTime() {
  const now = new Date();
  const currentTimeElement = document.getElementById("currentTime");
  currentTimeElement.value = now.toLocaleTimeString();
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();
