    // Handle logout with confirmation
    function exit() {
        if (confirm('Are you sure to sign out safe-steps?')) {
            // Perform logout action here
            // alert('You have been logged out successfully');
            // In a real app, you would redirect to login page or similar
            window.location.href = 'index.html';
        }
    }

    // Add event listener to logout button
    // document.querySelector('.action-btn.btn-primary').addEventListener('click', exit);










     // Initialize maps for each ride request
     function initMap() {
        // Map for Ride 1
        const map1 = new google.maps.Map(document.getElementById("map-1"), {
            center: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates
            zoom: 14,
            disableDefaultUI: true,
            styles: [
                {
                    featureType: "poi",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });
        
        // Add marker for customer location (Ride 1)
        new google.maps.Marker({
            position: { lat: 40.7128, lng: -74.0080 },
            map: map1,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            },
            title: "Sarah Johnson"
        });
        
        // Add marker for pickup location (Ride 1)
        new google.maps.Marker({
            position: { lat: 40.7128, lng: -74.0060 },
            map: map1,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            },
            title: "Pickup Location"
        });

        // Map for Ride 2
        const map2 = new google.maps.Map(document.getElementById("map-2"), {
            center: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates
            zoom: 14,
            disableDefaultUI: true,
            styles: [
                {
                    featureType: "poi",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });
        
        // Add marker for customer location (Ride 2)
        new google.maps.Marker({
            position: { lat: 40.7135, lng: -74.0065 },
            map: map2,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            },
            title: "Emily Davis"
        });
        
        // Add marker for pickup location (Ride 2)
        new google.maps.Marker({
            position: { lat: 40.7128, lng: -74.0060 },
            map: map2,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            },
            title: "Pickup Location"
        });

        // In a real app, you would update these locations in real-time
        // This is just a simulation
        simulateMovement(map1, { lat: 40.7128, lng: -74.0080 });
        simulateMovement(map2, { lat: 40.7135, lng: -74.0065 });
    }

    // Simulate customer movement (for demo purposes)
    function simulateMovement(map, initialPosition) {
        let currentPosition = initialPosition;
        const marker = new google.maps.Marker({
            position: currentPosition,
            map: map,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        });
        
        setInterval(() => {
            // Random small movement
            currentPosition = {
                lat: currentPosition.lat + (Math.random() * 0.001 - 0.0005),
                lng: currentPosition.lng + (Math.random() * 0.001 - 0.0005)
            };
            marker.setPosition(currentPosition);
        }, 3000);
    }

    // document.querySelectorAll().function click() {
        
    // }

    // Handle ride accept/decline
    document.querySelectorAll('.btn-accept').forEach(button => {
        button.addEventListener('click', function() {
            const close = document.getElementById('close-btn');
            // const request_card = document.getElementById('request-card');
            const card = this.closest('.request-card');
            card.style.borderLeft = '4px solid var(--success)';
            this.textContent = 'Accepted ✓';
            this.style.backgroundColor = '#218838';
            this.nextElementSibling.style.display = 'none';
            close.style.display = 'block';
            
            // In a real app, you would connect to the customer here
            alert('Ride accepted! Navigating to customer...');
        });
    });

    document.querySelectorAll('.btn-reject').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            card.style.borderLeft = '4px solid var(--danger)';
            this.textContent = 'Declined ✗';
            this.style.backgroundColor = '#c82333';
            this.previousElementSibling.style.display = 'none';
        });
    });

    // Get real user location (if enabled)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Driver location:', position.coords.latitude, position.coords.longitude);
                // In a real app, you would send this to your server
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    }


 // Add this script to handle image upload and preview
 document.getElementById('avatarInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.driver-avatar').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});