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
    // document.getElementById("signIn-form").addEventListener("submit", function (e) {
    //     e.preventDefault();

    //     const username = document.getElementById('user').value.trim();
    //     const password = document.getElementById('pass').value;
    //     const alertT = document.getElementById('alert-title');
    //     const alertS = document.getElementById('alert-summary');
    //     const alertBox = document.getElementById('customAlert');
    //     const alertBtn = document.getElementById('confirmBtn');
    //     const form = document.getElementById('signIn-form');

    //     // Basic validation
    //     if (!username || !password) {
    //         showAlert(alertBox, alertT, alertS, "Login Failed!", "Please enter both username and password.");
    //         return;
    //     }

    //     // Check credentials (in a real app, this would be a server-side check)
    //     if (username === 'shuvaranjan5@gmail.com' && password === '2004') {
    //         // Successful login
    //         showAlert(alertBox, alertT, alertS, "Login Successful!", "Welcome to Safe Steps", true);
            
    //         // Redirect after a delay to let user see the message
    //         setTimeout(() => {
    //             window.location.href = 'user_Main.html';
    //         }, 2000);
    //     } else {
    //         // Failed login
    //         showAlert(alertBox, alertT, alertS, "Login Failed!", "Invalid username or password. Please try again.");
    //     }
    // });

    // // Function to show alert and handle video pausing
    // function showAlert(alertBox, alertTitle, alertSummary, title, message, isSuccess = false) {
    //     // Pause the video
    //     const video = document.getElementById("bg-video");
    //     video.pause();
        
    //     // Show alert
    //     alertBox.style.display = 'block';
    //     alertTitle.textContent = title;
    //     alertSummary.textContent = message;
        
    //     // Hide button for success case
    //     const alertBtn = document.getElementById('confirmBtn');
    //     if (isSuccess) {
    //         alertBtn.style.display = 'none';
    //     } else {
    //         alertBtn.style.display = 'block';
    //         // Add one-time event listener for closing
    //         alertBtn.onclick = function() {
    //             alertBox.style.display = 'none';
    //             // Resume video playback
    //             video.play();
    //         };
    //     }
    // }
});