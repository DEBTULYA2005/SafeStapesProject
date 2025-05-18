// document.querySelector(".details-form").addEventListener("submit", function (e) {
//     const vehicle_type = document.getElementById("vType").value.trim();
//     const vehicle_number = document.getElementById("vNumber").value.trim();
//     const vehicle_color = document.getElementById("vColor").value.trim();

//     // Validate all fields
//     if (!vehicle_type || !vehicle_number || !vehicle_color) {
//         e.preventDefault();
//         alert("Please fill all the details!");
//         return;
//     }

//     if (vehicle_number.length !== 10) {
//         e.preventDefault();
//         alert('Please enter a valid 10-character vehicle number!');
//         return;
//     }

//     const colorRegex = /^[A-Za-z\s]+$/;
//     if (!colorRegex.test(vehicle_color)) {
//         e.preventDefault();
//         alert('Vehicle color should only contain letters (no numbers or special characters)!');
//         return;
//     }

//     // ✅ No preventDefault here: allow normal form submission to backend
//     alert("Details submitted successfully...");
//     // let the form submit naturally to Django
// });
