// ============================================
// City Day-Night & Year Cycle Simulation
// ============================================

// Simulation Constants
const DAY_DURATION = 240; // 4 minutes for a full day (24 hours)
const SEASON_DURATION = 150; // 2.5 minutes per season (150 seconds)
const TOTAL_YEAR_DURATION = SEASON_DURATION * 4; // 10 minutes total

// Time tracking
let currentTime = 0; // Seconds elapsed
let currentHour = 6; // Start at 6 AM (sunrise)
let currentSeason = 0; // 0: Spring, 1: Summer, 2: Autumn, 3: Winter
let currentDay = 1;

// Season names
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
const seasonClasses = ['sky-spring', 'sky-summer', 'sky-autumn', 'sky-winter'];

// DOM Elements
const sky = document.getElementById('sky');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const starsContainer = document.getElementById('stars-container');
const cloudsContainer = document.getElementById('clouds-container');
const carsContainer = document.getElementById('cars-container');
const peopleContainer = document.getElementById('people-container');
const timeDisplay = document.getElementById('time-display');
const seasonDisplay = document.getElementById('season-display');
const dayDisplay = document.getElementById('day-display');
const windows = document.querySelectorAll('.window');
const lampLights = document.querySelectorAll('.lamp-light');

// ============================================
// Initialize Simulation
// ============================================
function init() {
    createStars();
    createClouds();
    updateSeasonClass();
    
    // Create initial traffic after a short delay
    setTimeout(() => {
        // Add a few initial cars
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                addCar();
            }, i * 2000);
        }
    }, 1000);
    
    startSimulation();
}

// ============================================
// Add Single Car
// ============================================
function addCar() {
    const car = document.createElement('div');
    const carColors = ['', 'car-blue', 'car-green', 'car-yellow'];
    const colorClass = carColors[Math.floor(Math.random() * carColors.length)] || '';
    car.className = `car ${colorClass}`;
    
    const speed = 50 + Math.random() * 30;
    car.style.left = '-50px';
    car.style.animation = `carMove ${(window.innerWidth + 100) / speed}s linear`;
    car.style.animationFillMode = 'forwards';
    
    carsContainer.appendChild(car);
    
    // Remove car after animation
    setTimeout(() => {
        if (car.parentNode) {
            car.parentNode.removeChild(car);
        }
    }, ((window.innerWidth + 100) / speed) * 1000);
}

// ============================================
// Add Single Person
// ============================================
function addPerson() {
    const person = document.createElement('div');
    person.className = 'person';
    
    const personHead = document.createElement('div');
    personHead.className = 'person-head';
    
    const personBody = document.createElement('div');
    personBody.className = 'person-body';
    
    person.appendChild(personHead);
    person.appendChild(personBody);
    
    const speed = 30 + Math.random() * 20;
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    
    if (direction === 'right') {
        person.style.left = '-20px';
        person.style.animation = `personMoveRight ${(window.innerWidth + 100) / speed}s linear`;
    } else {
        person.style.left = (window.innerWidth + 20) + 'px';
        person.style.animation = `personMoveLeft ${(window.innerWidth + 100) / speed}s linear`;
    }
    person.style.animationFillMode = 'forwards';
    
    peopleContainer.appendChild(person);
    
    // Remove person after animation
    setTimeout(() => {
        if (person.parentNode) {
            person.parentNode.removeChild(person);
        }
    }, ((window.innerWidth + 100) / speed) * 1000);
}

// ============================================
// Create Stars
// ============================================
function createStars() {
    starsContainer.innerHTML = '';
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 60; // Upper 60% of sky
        star.style.left = x + '%';
        star.style.top = y + '%';
        
        // Random twinkle delay
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// ============================================
// Create Clouds
// ============================================
function createClouds() {
    cloudsContainer.innerHTML = '';
    const cloudCount = 8;
    const cloudSizes = ['cloud-small', 'cloud-medium', 'cloud-large'];
    
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        const sizeClass = cloudSizes[Math.floor(Math.random() * cloudSizes.length)];
        cloud.className = `cloud ${sizeClass}`;
        
        // Random starting position and delay
        const startY = Math.random() * 30; // Upper 30% of sky
        const delay = Math.random() * 20;
        
        cloud.style.top = startY + '%';
        cloud.style.animationDelay = delay + 's';
        cloud.style.left = '-200px';
        
        cloudsContainer.appendChild(cloud);
    }
}

// ============================================
// Create Cars
// ============================================
function createCars() {
    // Initial cars are created dynamically by updateTraffic()
    // This function is kept for potential manual car creation
}

// Add car movement animation
const carMoveKeyframes = `
@keyframes carMove {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(100vw + 100px));
    }
}`;

const style = document.createElement('style');
style.textContent = carMoveKeyframes;
document.head.appendChild(style);

// ============================================
// Create People
// ============================================
function createPeople() {
    // Initial people are created dynamically by updateTraffic()
    // This function is kept for potential manual person creation
}

// Person movement animations are defined in CSS

// ============================================
// Update Sun and Moon Position
// ============================================
function updateCelestialBodies() {
    // Calculate time of day (0-24 hours)
    const dayProgress = (currentTime % DAY_DURATION) / DAY_DURATION;
    const hour = (dayProgress * 24) % 24;
    currentHour = hour;
    
    // Sun position (parabolic path)
    // Sun rises at 6 AM and sets at 6 PM
    let sunX, sunY, sunOpacity = 0;
    let moonX, moonY, moonOpacity = 0;
    
    if (hour >= 6 && hour < 18) {
        // Daytime - Sun is visible
        const dayProgress = (hour - 6) / 12; // 0 to 1 from 6 AM to 6 PM
        sunX = 10 + dayProgress * 80; // Move from 10% to 90%
        // Parabolic path: higher in the middle (noon at 12 PM)
        const parabola = 1 - Math.pow((dayProgress * 2 - 1), 2);
        sunY = 15 + parabola * 25; // Parabolic curve from 15% to 40%
        sunOpacity = 1;
        moonOpacity = 0;
        moonX = -50;
        moonY = 50;
    } else if (hour >= 18 && hour < 20) {
        // Evening - Sun setting, Moon rising
        const eveningProgress = (hour - 18) / 2;
        sunX = 90 + eveningProgress * 10;
        sunY = 40 + eveningProgress * 40;
        sunOpacity = 1 - eveningProgress * 0.8;
        
        // Moon rises on the left
        const moonProgress = eveningProgress;
        moonX = 5 + moonProgress * 40;
        moonY = 20 + (1 - Math.pow(moonProgress * 2 - 1, 2)) * 15;
        moonOpacity = eveningProgress;
    } else if (hour >= 20) {
        // Night - Moon is visible (8 PM - 12 AM)
        const nightProgress = (hour - 20) / 4; // 0 to 1 from 8 PM to 12 AM
        moonX = 50 + nightProgress * 40; // Move across sky from 50% to 90%
        const parabola = 1 - Math.pow((nightProgress * 2 - 1), 2);
        moonY = 20 + parabola * 15;
        moonOpacity = 1;
        sunOpacity = 0;
        sunX = -50;
        sunY = 100;
    } else if (hour >= 0 && hour < 4) {
        // Late Night - Moon continues (12 AM - 4 AM)
        const nightProgress = (hour + 4) / 4; // 0 to 1 from 12 AM to 4 AM
        moonX = 90 - nightProgress * 40; // Move across sky from 90% to 50%
        const parabola = 1 - Math.pow((nightProgress * 2 - 1), 2);
        moonY = 20 + parabola * 15;
        moonOpacity = 1;
        sunOpacity = 0;
        sunX = -50;
        sunY = 100;
    } else {
        // Dawn - Moon setting, Sun rising (4-6 AM)
        const dawnProgress = (hour - 4) / 2;
        moonX = 50 - dawnProgress * 45;
        moonY = 35 + dawnProgress * 25;
        moonOpacity = 1 - dawnProgress;
        
        sunX = 5 + dawnProgress * 5;
        sunY = 40 - dawnProgress * 25;
        sunOpacity = dawnProgress;
    }
    
    // Update sun position
    sun.style.left = sunX + '%';
    sun.style.top = sunY + '%';
    sun.style.opacity = sunOpacity;
    sun.style.transform = `translate(-50%, -50%)`;
    
    // Update moon position
    moon.style.left = moonX + '%';
    moon.style.top = moonY + '%';
    moon.style.opacity = moonOpacity;
    moon.style.transform = `translate(-50%, -50%)`;
}

// ============================================
// Update Sky Colors
// ============================================
function updateSkyColors() {
    const hour = currentHour;
    const isNight = hour < 6 || hour >= 18;
    
    // Remove all season and time classes
    sky.classList.remove('night', 'day', 'dawn', 'dusk');
    sky.classList.remove(...seasonClasses);
    
    // Add current season class
    sky.classList.add(seasonClasses[currentSeason]);
    
    // Add time of day class
    if (isNight || hour >= 20 || hour < 4) {
        sky.classList.add('night');
    } else if (hour >= 4 && hour < 6) {
        sky.classList.add('dawn');
    } else if (hour >= 18 && hour < 20) {
        sky.classList.add('dusk');
    } else {
        sky.classList.add('day');
    }
    
    // Update stars visibility
    if (isNight || hour >= 20 || hour < 6) {
        starsContainer.style.opacity = 1;
    } else {
        starsContainer.style.opacity = 0;
    }
    
    // Update clouds visibility (less visible at night)
    if (isNight) {
        cloudsContainer.style.opacity = 0.2;
    } else {
        cloudsContainer.style.opacity = 0.7;
    }
}

// ============================================
// Update Building Windows
// ============================================
let windowStates = {}; // Store window states to maintain consistency

function updateBuildingWindows() {
    const hour = currentHour;
    const isNight = hour < 6 || hour >= 18;
    
    // Initialize window states if not set
    if (Object.keys(windowStates).length === 0) {
        windows.forEach((window, index) => {
            windowStates[index] = Math.random() > 0.3; // 70% chance to be lit at night
        });
    }
    
    windows.forEach((window, index) => {
        if (isNight) {
            // Use stored state or generate new one
            if (windowStates[index] === undefined) {
                windowStates[index] = Math.random() > 0.3;
            }
            if (windowStates[index]) {
                window.classList.add('lit');
            } else {
                window.classList.remove('lit');
            }
        } else {
            window.classList.remove('lit');
        }
    });
    
    // Occasionally change window states (every 10-15 seconds)
    if (isNight && Math.random() > 0.99) {
        const randomIndex = Math.floor(Math.random() * windows.length);
        windowStates[randomIndex] = !windowStates[randomIndex];
    }
}

// ============================================
// Update Street Lights
// ============================================
function updateStreetLights() {
    const hour = currentHour;
    const isNight = hour < 6 || hour >= 18;
    
    lampLights.forEach(lamp => {
        if (isNight) {
            lamp.classList.add('on');
        } else {
            lamp.classList.remove('on');
        }
    });
}

// ============================================
// Update Season
// ============================================
function updateSeason() {
    const seasonProgress = (currentTime % TOTAL_YEAR_DURATION) / TOTAL_YEAR_DURATION;
    const newSeason = Math.floor(seasonProgress * 4);
    
    if (newSeason !== currentSeason) {
        currentSeason = newSeason;
        updateSeasonClass();
    }
    
    // Calculate current day (assuming ~30 days per season, 120 days per year)
    const daysPerSeason = 30;
    const seasonDay = Math.floor((currentTime % TOTAL_YEAR_DURATION) / (TOTAL_YEAR_DURATION / (daysPerSeason * 4)));
    currentDay = (seasonDay % (daysPerSeason * 4)) + 1;
}

function updateSeasonClass() {
    // Remove all season classes
    seasonClasses.forEach(className => {
        sky.classList.remove(className);
    });
    
    // Add current season class
    sky.classList.add(seasonClasses[currentSeason]);
    seasonDisplay.textContent = seasons[currentSeason];
}

// ============================================
// Update Display
// ============================================
function updateDisplay() {
    // Update time display
    const hours = Math.floor(currentHour);
    const minutes = Math.floor((currentHour % 1) * 60);
    const timeString = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
    timeDisplay.textContent = timeString;
    
    // Update season display
    seasonDisplay.textContent = seasons[currentSeason];
    
    // Update day display
    dayDisplay.textContent = currentDay;
}

// ============================================
// Main Simulation Loop
// ============================================
function startSimulation() {
    setInterval(() => {
        // Update time
        currentTime += 0.1; // Update every 100ms
        
        // Update season
        updateSeason();
        
        // Update celestial bodies
        updateCelestialBodies();
        
        // Update sky colors
        updateSkyColors();
        
        // Update building windows
        updateBuildingWindows();
        
        // Update street lights
        updateStreetLights();
        
        // Update display
        updateDisplay();
        
        // Update traffic
        updateTraffic();
    }, 100); // Update every 100ms
}

// ============================================
// Update Traffic (Cars and People)
// ============================================
let lastTrafficUpdate = 0;

function updateTraffic() {
    const now = Date.now();
    // Update traffic every 3-8 seconds
    if (now - lastTrafficUpdate > 3000 + Math.random() * 5000) {
        lastTrafficUpdate = now;
        
        // Randomly add cars (low density)
        const cars = document.querySelectorAll('.car');
        if (cars.length < 3 && Math.random() > 0.6) {
            addCar();
        }
        
        // Randomly add people (very low density, only during day)
        const people = document.querySelectorAll('.person');
        const hour = currentHour;
        const isDay = hour >= 6 && hour < 20;
        
        if (isDay && people.length < 2 && Math.random() > 0.7) {
            addPerson();
        }
    }
}

// ============================================
// Handle Window Resize
// ============================================
window.addEventListener('resize', () => {
    // Clear existing traffic on resize (new traffic will be created automatically)
    // This prevents positioning issues when window is resized
});

// ============================================
// Start Simulation on Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

