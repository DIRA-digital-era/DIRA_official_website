        function toggleMenu() {
            const header = document.getElementById('header');
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            header.style.height = "fit-content";
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        function toggleDropdown(e) {
            e.preventDefault();
        }

        document.addEventListener('click', function(event) {
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            const header = document.querySelector('header');
            
            if (!header.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
 