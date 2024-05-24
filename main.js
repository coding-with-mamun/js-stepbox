// Get all main elements
const surveyStepProgress = document.querySelector(".surveyStepProgress");
const surveyProgressText = document.querySelector(".surveyProgressText");
const surveyStepSixCloseBtn = document.querySelector(".surveyStepSixCloseBtn");
const surveyStepProgressBar = document.querySelector(
  ".surveyStepProgress .survey-bar span"
);

const surveySteps = [
  document.querySelector(".surveyStepOne"),
  document.querySelector(".surveyStepTwo"),
  document.querySelector(".surveyStepThree"),
  document.querySelector(".surveyStepFour"),
  document.querySelector(".surveyStepFive"),
  document.querySelector(".surveyStepSix"),
];

// Get buttons
const surveyStepOneBtn = document.querySelectorAll(".surveyStepOneBtn");
const surveyStepTwoBtn = document.querySelectorAll(".surveyStepTwoBtn");
const surveyStepMinus = document.querySelectorAll(".surveyStepMinus");

// Function to format the time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

// Function to start the countdown timer
function startCountdown(element) {
  let remainingSeconds = 2 * 60; // Set the initial time to 2 minutes (120 seconds)

  const intervalId = setInterval(() => {
    remainingSeconds--;
    element.innerHTML = formatTime(remainingSeconds);

    if (remainingSeconds === 0) {
      clearInterval(intervalId);
    }
  }, 1000); // Update the timer every second
}

// Function to show a survey step
function showSurveyStep(
  currentStepIndex,
  nextStepIndex,
  progressText,
  progressWidth,
  callback
) {
  // Hide current step
  if (surveySteps[currentStepIndex]) {
    surveySteps[currentStepIndex].classList.remove("survey-active");
    setTimeout(() => {
      surveySteps[currentStepIndex].style.display = "none";
    }, 200);
  }

  // Show next step
  if (surveySteps[nextStepIndex]) {
    surveySteps[nextStepIndex].style.display = "block";
    setTimeout(() => {
      surveySteps[nextStepIndex].classList.add("survey-active");
    }, 200);
  }

  // Update progress bar
  surveyStepProgress.classList.add("surveyProgressActive");
  surveyProgressText.innerHTML = progressText;
  setTimeout(() => {
    surveyStepProgressBar.style.width = progressWidth;
  }, 10);

  // Call the callback function after 1 second if provided
  if (callback) {
    setTimeout(callback, 1000);
  }
}

// Add event listeners for buttons
surveyStepOneBtn.forEach((item) => {
  item.onclick = () => {
    // Set progress to 75%, show step 2
    surveyStepProgressBar.style.width = "75%";
    showSurveyStep(0, 1, "75% Complete", "75%");
  };
});

surveyStepTwoBtn.forEach((item) => {
  item.onclick = () => {
    // Set progress to 75%, show remaining steps with a delay
    surveyStepProgressBar.style.width = "75%";
    setTimeout(() => {
      showSurveyStep(1, 2, "75% Complete", "75%", () => {
        showSurveyStep(2, 3, "75% Complete", "75%", () => {
          showSurveyStep(3, 4, "75% Complete", "75%", () => {
            showSurveyStep(4, 5, "100% Complete", "100%");

            // Start countdown timers for all surveyStepMinus elements
            surveyStepMinus.forEach(startCountdown);
          });
        });
      });
    }, 1000);
  };
});

// close last box
if (surveyStepSixCloseBtn) {
  surveyStepSixCloseBtn.onclick = () => {
    // Reset progress bar to 0%
    surveyStepProgressBar.style.width = "0%";

    // Hide all steps except the first one
    surveySteps.forEach((step, index) => {
      if (index !== 0) {
        step.style.display = "none";
        step.classList.remove("survey-active");
      } else {
        step.style.display = "block";
        step.classList.add("survey-active");
      }
    });

    // Update progress text to initial state
    surveyProgressText.innerHTML = "0% Complete";

    // Remove any active state from progress bar
    surveyStepProgress.classList.remove("surveyProgressActive");
  };
}
