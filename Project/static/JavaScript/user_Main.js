
// JavaScript to handle side menu toggle
const profileLink = document.getElementById('profileLink');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const backdrop = document.getElementById('backdrop');

// Open side menu when Profile link is clicked
profileLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    sideMenu.classList.add('active');
    backdrop.classList.add('active');
    emergencyBtn.style.animation = 'none';
});

// Close side menu when close button is clicked
closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    backdrop.classList.remove('active');
    emergencyBtn.style.animation = 'emergencyPulse 0.5s infinite alternate';

});

// Close side menu when clicking outside of it
backdrop.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    backdrop.classList.remove('active');
    emergencyBtn.style.animation = 'emergencyPulse 0.5s infinite alternate';

});

// Add this script to handle image upload and preview
document.getElementById('avatarInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector('.profile-avatar').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});


var emergencyPanel = document.getElementById('emergency-panel2');
var emergencyBtn = document.getElementById('emergency-btn');
var emergencyClose = document.getElementById('emergency-closebtn');
var background = document.getElementById('backdrop'); 

emergencyBtn.addEventListener('click', function (event) {

    emergencyPanel.style.display = 'block';
    emergencyBtn.style.display = 'none';
    backdrop.classList.add('active');

});
emergencyClose.addEventListener('click', function (event) {
    emergencyPanel.style.display = 'none';
    emergencyBtn.style.display = 'block';
    backdrop.classList.remove('active');

});

backdrop.addEventListener('click', () => {
    backdrop.classList.remove('active');
    emergencyPanel.style.display = 'none';
    emergencyBtn.style.display = 'block';
});

// Add this script to handle image upload and preview
document.getElementById('avatarInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector('.profile-avatar').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});














var swiper = new Swiper(".slide_content", {
    slidesPerView: 3,
    spaceBetween: 25,
    // slidesPerGroup: 2,
    loop: false,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    // loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        }
    },
});





var themeMode = document.getElementById("themeMode")
themeMode.onclick = function () {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
        themeMode.classList.remove("fa-sun");
        themeMode.classList.add("fa-moon");
    } else {
        themeMode.classList.remove("fa-moon");
        themeMode.classList.add("fa-sun");
    }
}






// Add this to your existing JavaScript or in a script tag at the end of the body

// Get the chatbot toggler button
const chatbotToggler = document.getElementById('chatbot-toggler');

// Variable to track scroll position
let lastScrollPosition = 0;

// Function to handle scroll events
function handleScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Show chatbot toggler when scrolling down past 200px
    if (currentScrollPosition > 500 && currentScrollPosition > lastScrollPosition) {
        // Scrolling down
        chatbotToggler.style.display = 'flex'; // or 'block' depending on your CSS
    } else if (currentScrollPosition < lastScrollPosition && currentScrollPosition < 400) {
        // Scrolling up near the top
        chatbotToggler.style.display = 'none';
    }

    lastScrollPosition = currentScrollPosition;
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial check in case page loads scrolled down
handleScroll();















// AI
const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.getElementById("send-message");
const fileInput = document.getElementById("file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.getElementById("file-cancel");
const chatBotToggler = document.getElementById("chatbot-toggler");
const closeChatbot = document.getElementById("close-chatbot");
// const backdrop = document.getElementById('backdrop');


// Gemini Api setup
const API_KEY = "AIzaSyBHCc5UwuRt1Mf7wiJfMcOMcH5m6g28JEo";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;


// Add this function





const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }
}

const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;

// create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

// Add this near your other constants
const websiteDetails = {
    name: "Safe-Steps",
    description: "A comprehensive health management platform providing medical services, appointment booking, and emergency assistance.",
    features: [
        "Safely Book Ride",
        "Emergency assistance",
        "Medical Services",
        "Health tips and articles",
        "Self Defense"
    ],
    creator: "Safe-Steps Org.",
    version: "1.0.0",
    launchDate: "2025-05-15"
};


const faqs = {
    "hours": "We're available 24/7",
    "contact": "Email us at safesteps@gmail.com",
    "services": "We offer: " +
        "\n1. Women Self Defense Training\n" +
        "2. Cyber Safety and Online Harassement Awarness\n" +
        "3. Legal Rights Education Sessions\n" +
        "4. Safety Device Distributions for Drivers",
    "help": "call this number 9064714325\n" +
        "Or you have got to 'EMERGENCY' button to message your problem.",
    "ride": "Go to top of the browser , press 'Safe Book Ride' to book your ride"
};

// Add this with your other constants
const closeCommands = ["close", "exit", "bye", "goodbye", "quit", "stop"];


// Generate bot response using api
const generateResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");




    // Check if user asked about website details
    const userMessage = userData.message.toLowerCase();
    if (userMessage.includes("website") || userMessage.includes("site") ||
        userMessage.includes("details") || userMessage.includes("about")) {

        // Create a formatted response with website details
        const websiteInfo = `
            <strong>${websiteDetails.name}</strong><br>
            ${websiteDetails.description}<br><br>
            <strong>Features:</strong><br>
            ${websiteDetails.features.map(f => `• ${f}`).join('<br>')}<br><br>
            <strong>Created by:</strong> ${websiteDetails.creator}<br>
            <strong>Version:</strong> ${websiteDetails.version}<br>
            <strong>Launched:</strong> ${websiteDetails.launchDate}
        `;

        messageElement.innerHTML = websiteInfo;
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        return;
    }


    // 3. FAQs
    const faqKey = Object.keys(faqs).find(key => userMessage.includes(key));
    if (faqKey) {
        messageElement.innerText = faqs[faqKey];
        return finalizeResponse(incomingMessageDiv);
    }




    // Add this check in generateResponse() before other handlers
    if (closeCommands.some(cmd => userMessage.includes(cmd))) {
        messageElement.innerHTML = `by...`;

        setTimeout(() => {
            document.body.classList.remove("show-chatbot");
            backdrop.classList.remove("active");
        }, 1500); // Close after 1.5 seconds

        return finalizeResponse(incomingMessageDiv);
    }



    // Add user message to chat history
    chatHistory.push({
        role: "user",
        "parts": [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])]
    });

    // API request options
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: chatHistory
        })
    }
    try {
        // Fetch bot response from API
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        // Extract and display bot's response text
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        messageElement.innerText = apiResponseText;

        // Add bot response to chat history
        chatHistory.push({
            role: "user",
            "parts": [{ text: userData.message }]
        });

    } catch (error) {
        console.log(error);
        messageElement.innerText = ":( " + error.message;
        messageElement.style.color = "#ff0000";

    } finally {
        // Reset user's file data, removing thinking indicator and scroll chat to bottom
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
}

// handle outgoing user message
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";
    fileUploadWrapper.classList.remove("file-uploaded");
    messageInput.dispatchEvent(new Event("input"));

    // create and display the user message
    const messageContent = `<div class="message-text"></div>
    ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    // enable auto scroll when response from bot
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    // simulate bot response with thinking indicator after a delay
    setTimeout(() => {
        const messageContent = `  <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                        viewBox="0 0 1024 1024">
                        <path
                            d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
                        </path>
                    </svg>
                    <div class="message-text">
                        <div class="thinking-indicator">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>`;

        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        // incomingMessageDiv.querySelector(".message-text").textContent = userData.message;
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        generateResponse(incomingMessageDiv);
    }, 600);

}

// handle enter key for sending message
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768) {
        handleOutgoingMessage(e);
    }


});

// Adjust input field height dynamically
messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
})

// handle file input change and preview the selected file
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        const base64String = e.target.result.split(",")[1];

        // store file data in user data
        userData.file = {
            data: base64String,
            mime_type: file.type
        }
        fileInput.value = "";
    }
    reader.readAsDataURL(file);
});

// cancel file upload
fileCancelButton.addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");

});


// Initialize emoji picker and handle emoji selection
const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const { selectionStart: start, selectionEnd: end } = messageInput;
        messageInput.setRangeText(emoji.native, start, end, "end");
        messageInput.focus();
    },
    onClickOutside: (e) => {
        if (e.target.id === "emoji-picker") {
            document.body.classList.toggle("show-emoji-picker");
        } else {
            document.body.classList.remove("show-emoji-picker");
        }
    }
});

document.querySelector(".chat-form").appendChild(picker);

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document.getElementById("file-upload").addEventListener("click", () => fileInput.click());
chatBotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));










// Form submission handling
document.getElementById("logout-profile").addEventListener("click", function (e) {
    e.preventDefault();

    // const user = document.getElementById("user").value.trim();
    // const fname = document.getElementById("fname").value;
    // const ph = document.getElementById("ph").value;
    // const password = document.getElementById("password").value;
    // const confirmPassword = document.getElementById("rePassword").value;

    const alertT = document.getElementById('alert-title');
    const alertS = document.getElementById('alert-summary');
    const alertBox = document.getElementById('customAlert');
    const alertBtn = document.getElementById('confirmBtn');
    const sideMenu = document.getElementById('sideMenu');
    const backdrop = document.getElementById('backdrop');

    backdrop.style.display = 'none';
    sideMenu.style.display = 'none';
    alertBox.style.display = 'block';
    alertT.textContent = "Are you sure to signOut Safe-Steps?";
    alertBtn.style.display = 'block';

    alertBtn.addEventListener('click', function () {
        window.location.href = "user_signIn.html";
        alertBox.style.display = 'none';

    })
    // // Check credentials (in a real app, this would be a server-side check)
    // if (!user || !fname || !ph || !password || !confirmPassword) {
    //     alertBox.style.display = 'block';
    //     alertBtn.style.display = 'block';
    //     alertT.textContent = "Please Enter the empty fields!";
    //     // alertS.textContent = "both are be matched!";
    // }
    // else if (password !== confirmPassword) {
    //     alertBox.style.display = 'block';
    //     alertBtn.style.display = 'block';
    //     alertT.textContent = "Password don't matched!";
    //     alertS.textContent = "both are be matched!";
    // } else {
    //     // Successful login
    //     alertBox.style.display = 'block';
    //     alertBtn.style.display = 'none';
    //     alertT.textContent = "Account Registered Successful";
    //     alertS.textContent = "Login to Safe-Steps";


    //     // Redirect after a delay to let user see the message
    //     setTimeout(() => {
    //         window.location.href = 'user_signIn.html';
    //     }, 1500);

    // }
});












document.getElementById("searchfield").addEventListener("submit", function (e) {
    e.preventDefault();

    const pickUp = document.getElementById('pickupLocation').value.trim();
    const drop = document.getElementById('dropLocation').value.trim();
    const book = document.getElementById('bookingContainer');
    const driverResponse = document.getElementById('responseContainer');
    const driverComing = document.getElementById('riderContainer');

    // Basic validation
    if (!pickUp || !drop) {
        alert("Please enter both Pickup and Drop locations!");
        return;
    }

    if (pickUp === drop) {
        book.style.display = 'none';
        driverResponse.style.display = 'block';

        // Redirect after a delay to let user see the message
        setTimeout(() => {
        driverResponse.style.display = 'none';
        driverComing.style.display = 'flex';
           
        }, 3000);
    }

    // If validation passes, submit the form (or handle further logic)
    // console.log("Pickup:", pickUp, "Drop:", drop);
    // Uncomment & use this in production:
    // this.submit(); // Submits the form if no errors
});







// Function to show alert
function showAlert(title, message) {
    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-summary').textContent = message;
    document.getElementById('customAlert').style.display = 'flex';
    
    // Prevent scrolling
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll'); // Add to html element as well
}

// Function to hide alert
function hideAlert() {
    document.getElementById('customAlert').style.display = 'none';
    
    // Allow scrolling again
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
}

// Add event listeners to your buttons
document.getElementById('confirmBtn').addEventListener('click', hideAlert);
document.getElementById('cancelBtn').addEventListener('click', hideAlert);

// Update your logout handler to use showAlert
document.getElementById("logout-profile").addEventListener("click", function (e) {
    e.preventDefault();

    const sideMenu = document.getElementById('sideMenu');
    const backdrop = document.getElementById('backdrop');

    backdrop.style.display = 'none';
    sideMenu.style.display = 'none';
    
    showAlert("Are you sure to signOut Safe-Steps?", "");
    
    document.getElementById('confirmBtn').addEventListener('click', function() {
        window.location.href = "user_signIn.html";
    });
});