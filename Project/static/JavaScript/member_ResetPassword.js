
// Toggle password visibility function
function togglePassword(icon) {
    const input = icon.previousElementSibling;
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





/*--------------------- Match or not -----------------------------*/
function matchPassword() {
    const text2 = document.querySelector(".text2");
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("confirmPassword").value;


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
document.querySelector(".reset-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {
        alert("Password don't match!");
        return;
    }else if (password < 6) {
        alert('Your Password is very weak, set a strong password!')
    } 
    else {

        alert("Password reset successfully!");

        // redirect to next page
        window.location.href = "index.html";
    }

});









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
