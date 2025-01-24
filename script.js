// Gestion de la navigation active
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    
    // Vérifier le thème enregistré
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Changer l'icône
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
    
    // Définir l'icône initiale
    const icon = themeToggle.querySelector('i');
    if (savedTheme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Ajouter la classe active lors du clic
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Retirer la classe active de tous les éléments
            navItems.forEach(nav => nav.classList.remove('active'));
            // Ajouter la classe active à l'élément cliqué
            item.classList.add('active');
        });
    });

    // Animation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Animation de la barre de navigation au scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll vers le bas
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll vers le haut
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Ajouter à la fin du fichier script.js
function openVideoModal(videoSrc, title) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    
    video.src = videoSrc;
    modalTitle.textContent = title;
    modal.style.display = 'block';
    
    // Arrêter la vidéo quand on ferme le modal
    document.querySelector('.close-modal').onclick = function() {
        modal.style.display = 'none';
        video.pause();
        video.currentTime = 0;
    }
    
    // Fermer le modal en cliquant en dehors
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            video.pause();
            video.currentTime = 0;
        }
    }
}

// Fermer le modal avec la touche Echap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        const video = document.getElementById('modalVideo');
        modal.style.display = 'none';
        video.pause();
        video.currentTime = 0;
    }
}); 