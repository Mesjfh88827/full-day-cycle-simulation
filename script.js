// ============================================
// Configuration Constants
// ============================================
const DAY_DURATION = 240; // 4 minutes for a full 24-hour day cycle
const SEASON_DURATION = 150; // 2.5 minutes per season
const TOTAL_YEAR_DURATION = SEASON_DURATION * 4; // 10 minutes total year
const UPDATE_INTERVAL = 100; // Update every 100ms for smooth animation

// ============================================
// Global Variables
// ============================================
let currentTime = 0; // Current simulation time in seconds
let currentHour = 6; // Current hour (0-24)
let currentSeason = 0; // Current season index (0-3)
let currentMonth = 0; // Current month index (0-11)

// Season names
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
const seasonClasses = ['sky-spring', 'sky-summer', 'sky-autumn', 'sky-winter'];

// Month names - aligned with seasons
// Spring: March(2), April(3), May(4)
// Summer: June(5), July(6), August(7)
// Autumn: September(8), October(9), November(10)
// Winter: December(11), January(0), February(1)
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Map season index to month indices
const seasonMonths = [
    [2, 3, 4],   // Spring: March, April, May
    [5, 6, 7],   // Summer: June, July, August
    [8, 9, 10],  // Autumn: September, October, November
    [11, 0, 1]   // Winter: December, January, February
];

// ============================================
// DOM Elements
// ============================================
const sky = document.getElementById('sky');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const starsContainer = document.getElementById('stars-container');
const cloudsContainer = document.getElementById('clouds-container');
const timeDisplay = document.getElementById('time-display');
const seasonDisplay = document.getElementById('season-display');
const monthDisplay = document.getElementById('month-display');

// ============================================
// Initialization
// ============================================
function init() {
    createStars();
    createClouds();
    updateSeasonClass();
    // Initialize month to March (first month of Spring)
    currentMonth = seasonMonths[0][0]; // March
    updateDisplay();
    startSimulation();
}

// ============================================
// Create Stars - Generate starfield for night sky
// ============================================
function createStars() {
    starsContainer.innerHTML = '';
    const starCount = 150; // Number of stars
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = x + '%';
        star.style.top = y + '%';
        
        // Random size (small, medium, large)
        const size = Math.random();
        if (size > 0.8) {
            star.classList.add('large');
        } else if (size > 0.5) {
            star.classList.add('medium');
        }
        
        // Random twinkle animation delay and duration
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// ============================================
// Create Clouds - Generate moving clouds
// ============================================
function createClouds() {
    cloudsContainer.innerHTML = '';
    const cloudCount = 10; // Number of clouds
    const cloudSizes = ['cloud-small', 'cloud-medium', 'cloud-large'];
    
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        const sizeClass = cloudSizes[Math.floor(Math.random() * cloudSizes.length)];
        cloud.className = `cloud ${sizeClass}`;
        
        // Random vertical position (top 60% of sky)
        const startY = Math.random() * 60;
        const delay = Math.random() * 30; // Random start delay
        const duration = 20 + Math.random() * 40; // Random speed (20-60s)
        
        cloud.style.top = startY + '%';
        cloud.style.left = '-250px';
        cloud.style.animation = `moveCloud ${duration}s linear infinite`;
        cloud.style.animationDelay = delay + 's';
        
        cloudsContainer.appendChild(cloud);
    }
}

// ============================================
// Update Celestial Bodies - Sun and Moon movement
// ============================================
function updateCelestialBodies() {
    const dayProgress = (currentTime % DAY_DURATION) / DAY_DURATION;
    const hour = (dayProgress * 24) % 24;
    currentHour = hour;
    
    let sunX, sunY, sunOpacity = 0;
    let moonX, moonY, moonOpacity = 0;
    
    // Calculate sun and moon positions based on time of day
    if (hour >= 6 && hour < 18) {
        // Daytime: Sun visible, Moon hidden
        const dayProgress = (hour - 6) / 12; // 0 to 1 from 6am to 6pm
        sunX = 10 + dayProgress * 80; // Sun moves from left to right
        // Parabolic path: highest at noon (hour 12)
        const parabola = 1 - Math.pow((dayProgress * 2 - 1), 2);
        sunY = 15 + parabola * 25; // Sun arcs through the sky
        sunOpacity = 1;
        
        moonOpacity = 0;
        moonX = -50;
        moonY = 50;
    } else if (hour >= 18 && hour < 20) {
        // Sunset: Sun setting, Moon rising
        const eveningProgress = (hour - 18) / 2; // 0 to 1 from 6pm to 8pm
        sunX = 90 + eveningProgress * 10;
        sunY = 40 + eveningProgress * 40;
        sunOpacity = 1 - eveningProgress * 0.8; // Fade out
        
        // Moon rises during sunset
        const moonProgress = eveningProgress;
        moonX = 5 + moonProgress * 30;
        moonY = 25 + (1 - Math.pow(moonProgress * 2 - 1, 2)) * 10;
        moonOpacity = eveningProgress;
    } else if (hour >= 20 || hour < 4) {
        // Night: Moon visible, Sun hidden
        let nightProgress;
        if (hour >= 20) {
            nightProgress = (hour - 20) / 8; // 0 to 1 from 8pm to 4am (8 hours)
        } else {
            nightProgress = (hour + 4) / 8; // Continue from 0am
        }
        
        moonX = 35 + nightProgress * 50; // Moon moves across sky
        // Parabolic path: highest at midnight (hour 0)
        const parabola = 1 - Math.pow((nightProgress * 2 - 1), 2);
        moonY = 20 + parabola * 15;
        moonOpacity = 1;
        
        sunOpacity = 0;
        sunX = -50;
        sunY = 100;
    } else {
        // Dawn: Moon setting, Sun rising (4am to 6am)
        const dawnProgress = (hour - 4) / 2; // 0 to 1 from 4am to 6am
        moonX = 85 - dawnProgress * 50;
        moonY = 35 + dawnProgress * 25;
        moonOpacity = 1 - dawnProgress; // Fade out
        
        // Sun rises during dawn
        sunX = 5 + dawnProgress * 5;
        sunY = 40 - dawnProgress * 25;
        sunOpacity = dawnProgress; // Fade in
    }
    
    // Apply positions and opacity
    sun.style.left = sunX + '%';
    sun.style.top = sunY + '%';
    sun.style.opacity = sunOpacity;
    
    moon.style.left = moonX + '%';
    moon.style.top = moonY + '%';
    moon.style.opacity = moonOpacity;
}

// ============================================
// Update Sky Colors - Based on time and season
// ============================================
function updateSkyColors() {
    const hour = currentHour;
    
    // Remove all time-of-day and season classes
    sky.classList.remove('dawn', 'day', 'dusk', 'night');
    sky.classList.remove(...seasonClasses);
    
    // Add current season class
    sky.classList.add(seasonClasses[currentSeason]);
    
    // Add time-of-day class
    if (hour >= 4 && hour < 6) {
        sky.classList.add('dawn');
    } else if (hour >= 6 && hour < 18) {
        sky.classList.add('day');
    } else if (hour >= 18 && hour < 20) {
        sky.classList.add('dusk');
    } else {
        sky.classList.add('night');
    }
    
    // Show/hide stars based on time
    if (hour >= 20 || hour < 6) {
        starsContainer.style.opacity = 1;
    } else {
        starsContainer.style.opacity = 0;
    }
    
    // Adjust cloud opacity based on time
    if (hour >= 20 || hour < 6) {
        cloudsContainer.style.opacity = 0.3; // Dimmer at night
    } else {
        cloudsContainer.style.opacity = 0.8; // Brighter during day
    }
}

// ============================================
// Update Season - Cycle through seasons
// ============================================
function updateSeason() {
    const seasonProgress = (currentTime % TOTAL_YEAR_DURATION) / TOTAL_YEAR_DURATION;
    const newSeason = Math.floor(seasonProgress * 4);
    
    if (newSeason !== currentSeason) {
        currentSeason = newSeason;
        updateSeasonClass();
    }
    
    // Calculate current month based on season and progress within season
    // Each season has 3 months, each month lasts SEASON_DURATION / 3 seconds
    const MONTH_DURATION = SEASON_DURATION / 3; // 50 seconds per month
    const seasonTime = (currentTime % TOTAL_YEAR_DURATION) % SEASON_DURATION;
    const monthIndexInSeason = Math.floor(seasonTime / MONTH_DURATION);
    
    // Get the month index from the season's month array
    currentMonth = seasonMonths[currentSeason][monthIndexInSeason];
}

// ============================================
// Update Season Class - Apply season styling
// ============================================
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
// Update Display - Update info panel
// ============================================
function updateDisplay() {
    // Update time display (HH:MM format)
    const hours = Math.floor(currentHour);
    const minutes = Math.floor((currentHour % 1) * 60);
    const timeString = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
    timeDisplay.textContent = timeString;
    
    // Update season display
    seasonDisplay.textContent = seasons[currentSeason];
    
    // Update month display
    monthDisplay.textContent = months[currentMonth];
}

// ============================================
// Main Simulation Loop
// ============================================
function startSimulation() {
    setInterval(() => {
        // Update simulation time
        currentTime += UPDATE_INTERVAL / 1000; // Convert ms to seconds
        
        // Update season
        updateSeason();
        
        // Update celestial bodies (sun and moon)
        updateCelestialBodies();
        
        // Update sky colors
        updateSkyColors();
        
        // Update display
        updateDisplay();
    }, UPDATE_INTERVAL);
}

// ============================================
// Handle Window Resize - Regenerate clouds on resize
// ============================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createClouds();
    }, 250);
});

// ============================================
// Start Simulation on Page Load
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}





