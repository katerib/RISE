class PlanetThemeToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('planet-theme') || 'earth';
        this.init();
    }

    init() {
        this.createToggle();
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    getBasePath() {
        return window.location.pathname.includes('/pages/') ? '../' : '';
    }

    createToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'planet-toggle';
        const basePath = this.getBasePath();
        toggle.innerHTML = `
            <div class="planet-option earth" data-theme="earth" title="Earth Theme">
                <img src="${basePath}assets/images/earth.svg" alt="Earth" class="planet-icon">
            </div>
            <div class="planet-option mars" data-theme="mars" title="Mars Theme">
                <img src="${basePath}assets/images/mars.svg" alt="Mars" class="planet-icon">
            </div>
        `;
        document.body.appendChild(toggle);
        this.toggleElement = toggle;
    }

    bindEvents() {
        this.toggleElement.addEventListener('click', (e) => {
            const planetOption = e.target.closest('.planet-option');
            if (planetOption) {
                const theme = planetOption.dataset.theme;
                this.switchTheme(theme);
            }
        });
    }

    switchTheme(theme) {
        if (theme === this.currentTheme) return;
        
        this.currentTheme = theme;
        this.applyTheme(theme);
        localStorage.setItem('planet-theme', theme);
        
        document.body.style.transform = 'scale(0.98)';
        setTimeout(() => {
            document.body.style.transform = '';
        }, 150);
    }

    applyTheme(theme) {
        document.documentElement.removeAttribute('data-theme');
        
        if (theme === 'mars') {
            document.documentElement.setAttribute('data-theme', 'mars');
        }
        
        this.updateToggleState(theme);
        
        // ++ slight delay to ensure DOM is ready
        setTimeout(() => {
            this.updateSVGColors(theme);
        }, 50);
    }

    updateToggleState(theme) {
        const options = this.toggleElement.querySelectorAll('.planet-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
    }

    updateSVGColors(theme) {
        // try multiple selectors to catch all rockets
        const selectors = [
            'img[src*="rocket"]',
            'img[class*="rocket"]',
            '.rocket-icon',
            '.hero-rocket'
        ];
        
        selectors.forEach(selector => {
            const rocketImages = document.querySelectorAll(selector);
            
            rocketImages.forEach(img => {
                if (img.tagName !== 'IMG') return;
                
                const currentSrc = img.getAttribute('src') || img.src;
                let newSrc;
                
                if (theme === 'mars') {
                    if (currentSrc.includes('../assets/') || window.location.pathname.includes('/pages/')) {
                        newSrc = '../assets/images/rocket-mars.svg';
                    } else {
                        newSrc = 'assets/images/rocket-mars.svg';
                    }
                } else {
                    if (currentSrc.includes('../assets/') || window.location.pathname.includes('/pages/')) {
                        newSrc = '../assets/images/rocket-earth.svg';
                    } else {
                        newSrc = 'assets/images/rocket-earth.svg';
                    }
                }
                
                img.setAttribute('src', newSrc);
                img.src = newSrc;
            });
        });
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new PlanetThemeToggle();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlanetThemeToggle;
}