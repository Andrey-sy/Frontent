class CardSlider {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dots = document.querySelectorAll('.dot');
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.showCard(this.currentIndex);

        this.prevBtn.addEventListener('click', () => this.prevCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToCard(index));
        });

        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    showCard(index) {
        this.cards.forEach(card => {
            card.classList.remove('active');
        });

        this.updateDots(index);

        this.cards[index].classList.add('active');

        this.currentIndex = index;

        this.updateButtonStates();
    }

    prevCard() {
        if (this.currentIndex === 0) {
            return;
        }
        const newIndex = this.currentIndex - 1;
        this.showCard(newIndex);
    }

    nextCard() {
        if (this.currentIndex === this.cards.length - 1) {
            return;
        }
        const newIndex = this.currentIndex + 1;
        this.showCard(newIndex);
    }

    goToCard(index) {
        if (index === this.currentIndex) return;
        this.showCard(index);
    }

    updateDots(index) {
        this.dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    updateButtonStates() {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.cards.length - 1;
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
                this.prevCard();
                break;
            case 'ArrowRight':
                this.nextCard();
                break;
            case 'Home':
                this.goToCard(0);
                break;
            case 'End':
                this.goToCard(this.cards.length - 1);
                break;
        }
    }
}

document.addEventListener('scroll', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const scrolled = window.pageYOffset;

    if (parallaxBg) {
        const rate = scrolled * 0.3;
        parallaxBg.style.transform = `translate3d(0px, ${rate}px, 0px)`;

        const header = document.querySelector('.transparent-header');
        if (header) {
            if (scrolled > 50) {
                header.style.background = 'rgba(0, 0, 0, 0.85)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
            }
        }
    }
});

window.addEventListener('load', function() {
    console.log('Сайт загружен');

    const parallaxBg = document.querySelector('.parallax-bg');
    const imageLoading = document.querySelector('.image-loading');

    if (parallaxBg) {
        parallaxBg.style.opacity = '1';
        if (imageLoading) {
            imageLoading.style.display = 'none';
        }
    }

    const imageSources = [
        'img/sputnic.png',
        'img/users.png',
        'img/chats.png'
    ];

    setTimeout(() => {
        document.querySelectorAll('.feature-image').forEach((img, index) => {
            if (!img.complete || img.naturalHeight === 0) {
                console.warn(`Изображение ${imageSources[index]} не загрузилось`);
                img.onerror = function() {
                    this.parentElement.innerHTML = `
                        <div class="image-placeholder">
                            <i class="fas fa-image"></i>
                            <span>Изображение ${index + 1}</span>
                        </div>
                    `;
                };
            }
        });
    }, 1000);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Badzoom инициализирован');

    const slider = new CardSlider();
});