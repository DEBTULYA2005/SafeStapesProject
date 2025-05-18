// document.querySelector(".signin-form").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const remember = document.getElementById("remember").checked;

//     // static
//     var contain_email = "shuvaranjan450@gmail.com";
//     var contain_pass = "shuvaranjan@2004";
//     // let contain_remember = remember

//     if(remember){
//         if (email === contain_email && password === contain_pass ) {
//             alert("Account Signed Successfully...\nWelcome to Safe Steps");
//             //redirect this page
//             window.location.href = "mainPanel.html";
//         }else{
//             alert("Account Signin failed, \nPlease enter valid credentials!");
//         } 
//     }else {
//         alert("Please check the option 'remember me'!");
        
//     }
// });



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





