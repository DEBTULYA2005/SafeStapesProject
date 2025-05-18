// Menu functionality
document.addEventListener('DOMContentLoaded', function () {
    // Time and date display
    let time = document.getElementById("current-time");
    let date = document.getElementById("current-date");

    setInterval(() => {
        let datetime = new Date();
        time.innerHTML = datetime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        date.innerHTML = datetime.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: '2-digit',
            year: 'numeric'
        });
    }, 1000);

    // Menu toggle functionality
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('colse-btn');
    const aside = document.querySelector('aside');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            aside.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            aside.classList.remove('active');
        });
    }

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            const isClickInsideAside = aside.contains(e.target);
            const isClickOnMenuBtn = e.target === menuBtn || menuBtn.contains(e.target);

            if (!isClickInsideAside && !isClickOnMenuBtn) {
                aside.classList.remove('active');
            }
        }
    });

    // Section switching
    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        // Show selected section
        document.getElementById(sectionId).classList.add('active');

        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.classList.add('active');

        // Close menu on mobile after selection
        if (window.innerWidth <= 768) {
            aside.classList.remove('active');
        }
    }

    // Make showSection function globally available
    window.showSection = showSection;
});

document.getElementById("addMember").addEventListener("click", function (e) {
    e.preventDefault();

    const add_member = document.getElementById("addMember").value;
    // const password = document.getElementById("password").value;
    // const remember = document.getElementById("remember").checked;

    add_member.style.display = "block";

});


















// Theme toggler functionality
document.addEventListener('DOMContentLoaded', function () {
    const themeToggler = document.querySelector('.theme-toggler');
    if (themeToggler) {
        themeToggler.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');

            // Update active theme icon
            themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
            themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');

            // Save preference to localStorage
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('dark-theme', isDark);
        });

        // Check for saved theme preference
        if (localStorage.getItem('dark-theme') === 'true') {
            document.body.classList.add('dark-theme');
            themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
            themeToggler.querySelector('span:nth-child(2)').classList.add('active');
        }
    }
});










