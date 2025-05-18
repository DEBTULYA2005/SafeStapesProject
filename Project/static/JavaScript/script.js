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
});


document.addEventListener("DOMContentLoaded", function () {
const follower = document.getElementById("mouse-follower");

// Track mouse movement
document.addEventListener("mousemove", function (event) {
// Update the position of the follower
follower.style.left = `${event.clientX}px`;
follower.style.top = `${event.clientY}px`;
});
});

function opentab(tabname) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");
    
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}




