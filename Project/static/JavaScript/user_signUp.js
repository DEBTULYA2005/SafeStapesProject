// Toggle password visibility
function togglePassword(icon, inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}








// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById("password").value;
    const indicator = document.querySelector(".indicator");
    const text = document.querySelector(".text");
    const weak = document.querySelector(".weak");
    const medium = document.querySelector(".medium");
    const strong = document.querySelector(".strong");

    // Regular expressions for password strength
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    // Show/hide indicator based on input
    if (password.length > 0) {
        indicator.style.display = "flex";
        text.style.display = "block";
    } else {
        indicator.style.display = "none";
        text.style.display = "none";
        return;
    }

    // Reset all classes
    weak.classList.remove("active");
    medium.classList.remove("active");
    strong.classList.remove("active");

    // Calculate password strength score
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (hasLowerCase) strength++;
    if (hasUpperCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChars) strength++;

    // Apply strength indicators
    if (strength <= 2 || password.length < 6) {
        weak.classList.add("active");
        text.textContent = "Password is Weak";
        text.style.color = "#ff4757";
    } else if (strength <= 4) {
        weak.classList.add("active");
        medium.classList.add("active");
        text.textContent = "Password is Medium";
        text.style.color = "#ffa502";
    } else {
        weak.classList.add("active");
        medium.classList.add("active");
        strong.classList.add("active");
        text.textContent = "Password is Strong";
        text.style.color = "#2ed573";
    }
}







/*--------------------- Match or not -----------------------------*/
function matchPassword() {
    const text2 = document.querySelector(".text2");
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("rePassword").value;


    // Show/hide indicator based on input
    if (rePassword.length > 0) {
        text2.style.display = "block";
        if (password !== rePassword) {
            text2.textContent = "Password not matched!";
            text2.style.color = "#ff4757";

        } else {
            text2.textContent = "Password matched";
            text2.style.color = "#2ed573";

        }
    } else {
        text2.style.display = "none";
        return;
    }

}










// Form submission handling
// document.getElementById("signupForm").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const user = document.getElementById("user").value.trim();
//     const fname = document.getElementById("fname").value;
//     const ph = document.getElementById("ph").value;
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("rePassword").value;

//     const alertT = document.getElementById('alert-title');
//     const alertS = document.getElementById('alert-summary');
//     const alertBox = document.getElementById('customAlert');
//     const alertBtn = document.getElementById('confirmBtn');
//     const form = document.getElementById('signIn-form');

//     alertBtn.addEventListener('click', function () {
//         alertBox.style.display = 'none';
//     })
//     // Check credentials (in a real app, this would be a server-side check)
//     if (!user || !fname || !ph || !password || !confirmPassword) {
//         alertBox.style.display = 'block';
//         alertBtn.style.display = 'block';
//         alertT.textContent = "Please Enter the empty fields!";
//         // alertS.textContent = "both are be matched!";
//     }
//     else if (password !== confirmPassword) {
//         alertBox.style.display = 'block';
//         alertBtn.style.display = 'block';
//         alertT.textContent = "Password don't matched!";
//         alertS.textContent = "both are be matched!";
//     } else {
//         // Successful login
//         alertBox.style.display = 'block';
//         alertBtn.style.display = 'none';
//         alertT.textContent = "Account Registered Successful";
//         alertS.textContent = "Login to Safe-Steps";


//         // Redirect after a delay to let user see the message
//         setTimeout(() => {
//             window.location.href = 'user_signIn';
//         }, 1500);

//     }
// });