document.addEventListener("DOMContentLoaded", () => {

    const elementsToFade = document.querySelectorAll(
        '#introducao, #descrição, .img, .Arquivos, .timeline li'
    );

    elementsToFade.forEach(el => {
        el.classList.add('fade-in-element');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 
    });

    elementsToFade.forEach(el => {
        observer.observe(el);
    });

    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.id = 'lightbox-overlay';
    lightboxOverlay.classList.add('lightbox-overlay');

    const lightboxImage = document.createElement('img');
    lightboxImage.id = 'lightbox-image';
    lightboxImage.classList.add('lightbox-image');

    const closeButton = document.createElement('span');
    closeButton.classList.add('lightbox-close');
    closeButton.innerHTML = '&times;'; 

    lightboxOverlay.appendChild(lightboxImage);
    lightboxOverlay.appendChild(closeButton);
    document.body.appendChild(lightboxOverlay);

    const evidenceImages = document.querySelectorAll('.img img, .Foto-An img, .Foto-Casos img');

    evidenceImages.forEach(img => {
        img.style.cursor = 'pointer'; 
        img.addEventListener('click', (e) => {
            e.preventDefault(); 
            openModal(img.src, img.alt);
        });
    });

    function openModal(src, alt) {
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightboxOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        lightboxOverlay.classList.remove('visible');
        document.body.style.overflow = 'auto'; 
    }

    closeButton.addEventListener('click', closeModal);
    
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeModal();
        }
    });

});