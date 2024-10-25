let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if (window.innerWidth >= 768) {
        if (window.scrollY > lastScrollY) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
    } else {
        header.classList.remove('header-hidden');
    }
    
    lastScrollY = window.scrollY;
});

window.addEventListener('resize', () => {
    const header = document.querySelector('header');
    if (window.innerWidth < 768) {
        header.classList.remove('header-hidden');
    }
});
