// Added very simple space-techy elements and animations to try to make the site less empty-looking, but maybe too cheesy and we can remove
class SpaceTechEffects {
    constructor() {
        this.metrics = [
            { label: 'MARS DISTANCE', value: 225, unit: 'M KM', type: 'distance' },
            { label: 'CHARGING CYCLES', value: 1247, unit: 'CYCLES', type: 'counter' },
            { label: 'BATTERY EFFICIENCY', value: 94.7, unit: '%', type: 'percentage' },
            { label: 'OPERATION TEMP', value: -80, unit: '°C', type: 'temperature' },
            { label: 'SOLAR EXPOSURE', value: 6.2, unit: 'HRS', type: 'time' },
            { label: 'DUST RESISTANCE', value: 99.1, unit: '%', type: 'percentage' },
            { label: 'SIGNAL LATENCY', value: 14, unit: 'MIN', type: 'time' },
            { label: 'POWER OUTPUT', value: 2.3, unit: 'KW', type: 'power' }
        ];
        
        this.init();
    }

    init() {
        this.createFloatingStats();
        this.createTechGrid();
        this.startAnimations();
    }

    createFloatingStats() {
        const container = document.createElement('div');
        container.className = 'floating-stats';
        
        // positioned specifially to avoid text collision
        const staticAnnotations = [
            { text: 'nav.setTarget(LAT: -14.5684°)', left: '8%', top: '25%' },
            { text: 'thermal_mgmt.temp_delta = 12.3K', left: '82%', top: '35%' },
            { text: 'Al-7075-T6 σ_yield = 503MPa', left: '15%', top: '75%' },
            { text: 'IMU.gyro_drift < 0.1°/hr', left: '75%', top: '65%' },
            { text: 'power_sys.efficiency = 94.7%', left: '5%', top: '55%' },
            { text: 'GPS.CEP = 2.5m (95%)', left: '85%', top: '85%' }
        ];
        
        staticAnnotations.forEach(annotation => {
            const textElement = document.createElement('div');
            textElement.className = 'eng-annotation static';
            textElement.textContent = annotation.text;
            textElement.style.left = annotation.left;
            textElement.style.top = annotation.top;
            container.appendChild(textElement);
        });
        
        this.createTechnicalElements(container);
        document.body.appendChild(container);
    }
    
    createTechnicalElements(container) {
        const coordPositions = [
            { left: '20%', top: '40%' },
            { left: '70%', top: '20%' },
            { left: '30%', top: '80%' }
        ];
        
        coordPositions.forEach(pos => {
            const coords = document.createElement('div');
            coords.className = 'coord-system static';
            coords.innerHTML = `
                <div class="coord-line coord-x"></div>
                <div class="coord-line coord-y"></div>
                <div class="coord-origin"></div>
                <div class="coord-label">XYZ</div>
            `;
            coords.style.left = pos.left;
            coords.style.top = pos.top;
            container.appendChild(coords);
        });
        
        const traceConfigs = [
            { left: '25%', top: '30%', rotation: '45deg' },
            { left: '60%', top: '50%', rotation: '135deg' },
            { left: '40%', top: '60%', rotation: '90deg' },
            { left: '80%', top: '75%', rotation: '0deg' },
            { left: '10%', top: '70%', rotation: '45deg' },
            { left: '90%', top: '40%', rotation: '90deg' }
        ];
        
        traceConfigs.forEach(config => {
            const trace = document.createElement('div');
            trace.className = 'circuit-trace static';
            trace.style.left = config.left;
            trace.style.top = config.top;
            trace.style.transform = `rotate(${config.rotation})`;
            container.appendChild(trace);
        });
        
        const wireframePositions = [
            { left: '15%', top: '15%' },
            { left: '75%', top: '25%' },
            { left: '25%', top: '70%' },
            { left: '85%', top: '80%' }
        ];
        
        wireframePositions.forEach(pos => {
            const wireframe = document.createElement('div');
            wireframe.className = 'tech-wireframe static';
            wireframe.innerHTML = `
                <div class="wire-corner tl"></div>
                <div class="wire-corner tr"></div>
                <div class="wire-corner bl"></div>
                <div class="wire-corner br"></div>
                <div class="wire-center"></div>
            `;
            wireframe.style.left = pos.left;
            wireframe.style.top = pos.top;
            container.appendChild(wireframe);
        });
        
        const hexGrid = document.createElement('div');
        hexGrid.className = 'hex-grid dynamic';
        for (let i = 0; i < 8; i++) {
            const hex = document.createElement('div');
            hex.className = 'hex-cell';
            hex.style.left = `${Math.random() * 90 + 5}%`;
            hex.style.top = `${Math.random() * 80 + 10}%`;
            hex.style.animationDelay = `${Math.random() * 60}s`;
            hexGrid.appendChild(hex);
        }
        container.appendChild(hexGrid);
    }

    createTechGrid() {
        const container = document.createElement('div');
        container.className = 'tech-grid-overlay';
        
        // grid lines
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.className = 'grid-line';
            line.style.left = `${i * 5}%`;
            line.style.animationDelay = `${Math.random() * 3}s`;
            container.appendChild(line);
        }
        
        // scan line
        const scanner = document.createElement('div');
        scanner.className = 'scanner-line';
        container.appendChild(scanner);
        
        document.body.appendChild(container);
    }

    startAnimations() {
        // sweep
        this.startScanner();
    }

    startScanner() {
        const scanner = document.querySelector('.scanner-line');
        if (!scanner) return;
        
        setInterval(() => {
            scanner.style.animation = 'none';
            setTimeout(() => {
                scanner.style.animation = 'scan 4s ease-in-out';
            }, 100);
        }, 8000);
    }
}

// background particple system (moving)
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        document.body.appendChild(this.canvas);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                life: Math.random() * 1000 + 500
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 1;
            
            // wrap
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // reset if expired
            if (particle.life <= 0) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.life = Math.random() * 1000 + 500;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            // check theme for particle color
            const isMarsTheme = document.documentElement.getAttribute('data-theme') === 'mars';
            const color = isMarsTheme ? '204, 65, 37' : '88, 166, 255';
            this.ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // slight delay to ensure theme is applied
    setTimeout(() => {
        new SpaceTechEffects();
        new ParticleSystem();
    }, 100);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SpaceTechEffects, ParticleSystem };
}