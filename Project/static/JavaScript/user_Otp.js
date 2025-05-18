document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("bg-video");

    // Hide the video initially
    video.style.opacity = 0;

    // Wait for the video to load
    video.addEventListener("loadeddata", function () {
        // Fade in the video smoothly
        video.style.transition = "opacity 1s ease-in-out";
        video.style.opacity = 1;
    });

    // Fallback: If the video fails to load, ensure the background color is visible
    video.addEventListener("error", function () {
        document.querySelector(".video-background").style.backgroundColor = "#000"; // Fallback color
    });

    // Form submission handling
    document.getElementById("otp-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const alertT = document.getElementById('alert-title');
        const alertS = document.getElementById('alert-summary');
        const alertBox = document.getElementById('customAlert');
        const alertBtn = document.getElementById('confirmBtn');
       
            showAlert(alertBox, alertT, alertS, "Otp verified Successfully", "");
            alertBtn.style.display = 'none';
           
            setTimeout(() => {
                window.location.href = 'user_ResetPassword.html';
            }, 1500);
            return;
        
    });

    // Function to show alert and handle video pausing
    function showAlert(alertBox, alertTitle, alertSummary, title, message, isSuccess = false) {
        // Pause the video
        const video = document.getElementById("bg-video");
        video.pause();
        
        // Show alert
        alertBox.style.display = 'block';
        alertTitle.textContent = title;
        alertSummary.textContent = message;
        
        // Hide button for success case
        const alertBtn = document.getElementById('confirmBtn');
        if (isSuccess) {
            alertBtn.style.display = 'none';
        } else {
            alertBtn.style.display = 'block';
            // Add one-time event listener for closing
            alertBtn.onclick = function() {
                alertBox.style.display = 'none';
                // Resume video playback
                video.play();
            };
        }
    }
});



const inputs = document.querySelectorAll(".input-box input"),
    button = document.querySelector("form button");

// Function to check if all inputs are filled
function checkInputs() {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    if (allFilled) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}

// Iterate over all inputs
inputs.forEach((input, index1) => {
    input.addEventListener("keyup", (e) => {
        const currentInput = input,
            nextInput = input.nextElementSibling,
            prevInput = input.previousElementSibling;

        // If the value is more than one character, clear it
        if (currentInput.value.length > 1) {
            currentInput.value = "";
            return;
        }

        // If the next input is disabled and the current value is not empty,
        // enable the next input and focus on it
        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
            nextInput.removeAttribute("disabled");
            nextInput.focus();
        }

        // If the backspace key is pressed
        if (e.key === "Backspace" && prevInput) {
            currentInput.setAttribute("disabled", true);
            currentInput.value = "";
            prevInput.focus();
        }

        // Check if all inputs are filled
        checkInputs();
    });
});

// Focus the first input on window load
window.addEventListener("load", () => inputs[0].focus());

