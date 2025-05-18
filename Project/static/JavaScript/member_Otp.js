const inputs = document.querySelectorAll(".input-box input"),
    button = document.querySelector("form button");

function checkInputs() {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    if (allFilled) {
        button.classList.add("active");
        // When all inputs are filled, enable the button to submit
        button.removeAttribute("disabled");
    } else {
        button.classList.remove("active");
        button.setAttribute("disabled", "true");
    }
}

inputs.forEach((input, index1) => {
    input.addEventListener("keyup", (e) => {
        const currentInput = input,
            nextInput = input.nextElementSibling,
            prevInput = input.previousElementSibling;

        if (currentInput.value.length > 1) {
            currentInput.value = "";
            return;
        }

        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
            nextInput.removeAttribute("disabled");
            nextInput.focus();
        }

        if (e.key === "Backspace" && prevInput) {
            currentInput.setAttribute("disabled", true);
            currentInput.value = "";
            prevInput.focus();
        }

        checkInputs();
    });
});

// Add form submission handler
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    verifyOTP();
});

function verifyOTP() {
    alert("OTP Verified Successfully");
    // Redirect to the NEXT page after verification
    window.location.href = "resetPassword.html"; // Change to your actual target page
}

window.addEventListener("load", () => inputs[0].focus());