const DAY_DURATION = 240; 
const SEASON_DURATION = 150; 
const TOTAL_YEAR_DURATION = SEASON_DURATION * 4; 
const UPDATE_INTERVAL = 100; 

let currentTime = 0; 
let currentHour = 6; 
let currentSeason = 0; 
let currentMonth = 0; 

const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
const seasonClasses = ['sky-spring', 'sky-summer', 'sky-autumn', 'sky-winter'];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const seasonMonths = [
    [2, 3, 4],   
    [5, 6, 7],  
    [8, 9, 10],  
    [11, 0, 1]  
];

const sky = document.getElementById('sky');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const starsContainer = document.getElementById('stars-container');
const cloudsContainer = document.getElementById('clouds-container');
const timeDisplay = document.getElementById('time-display');
const seasonDisplay = document.getElementById('season-display');
const monthDisplay = document.getElementById('month-display');

function init() {
    createStars();
    createClouds();
    updateSeasonClass();
    currentMonth = seasonMonths[0][0]; // March
    updateDisplay();
    startSimulation();
}

function createStars() {
    starsContainer.innerHTML = '';
    const starCount = 150; 
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = x + '%';
        star.style.top = y + '%';
    
        const size = Math.random();
        if (size > 0.8) {
            star.classList.add('large');
        } else if (size > 0.5) {
            star.classList.add('medium');
        }
        
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

function createClouds() {
    cloudsContainer.innerHTML = '';
    const cloudCount = 10; 
    const cloudSizes = ['cloud-small', 'cloud-medium', 'cloud-large'];
    
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        const sizeClass = cloudSizes[Math.floor(Math.random() * cloudSizes.length)];
        cloud.className = `cloud ${sizeClass}`;

        const startY = Math.random() * 60;
        const delay = Math.random() * 30;
        const duration = 20 + Math.random() * 40; 
        
        cloud.style.top = startY + '%';
        cloud.style.left = '-250px';
        cloud.style.animation = `moveCloud ${duration}s linear infinite`;
        cloud.style.animationDelay = delay + 's';
        
        cloudsContainer.appendChild(cloud);
    }
}

function updateCelestialBodies() {
    const dayProgress = (currentTime % DAY_DURATION) / DAY_DURATION;
    const hour = (dayProgress * 24) % 24;
    currentHour = hour;
    
    let sunX, sunY, sunOpacity = 0;
    let moonX, moonY, moonOpacity = 0;

    if (hour >= 6 && hour < 18) {
        const dayProgress = (hour - 6) / 12; 
        sunX = 10 + dayProgress * 80; 
        const parabola = 1 - Math.pow((dayProgress * 2 - 1), 2);
        sunY = 15 + parabola * 25; 
        sunOpacity = 1;
        
        moonOpacity = 0;
        moonX = -50;
        moonY = 50;
    } else if (hour >= 18 && hour < 20) {
        const eveningProgress = (hour - 18) / 2; 
        sunX = 90 + eveningProgress * 10;
        sunY = 40 + eveningProgress * 40;
        sunOpacity = 1 - eveningProgress * 0.8; 
        
        const moonProgress = eveningProgress;
        moonX = 5 + moonProgress * 30;
        moonY = 25 + (1 - Math.pow(moonProgress * 2 - 1, 2)) * 10;
        moonOpacity = eveningProgress;
    } else if (hour >= 20 || hour < 4) {
        let nightProgress;
        if (hour >= 20) {
            nightProgress = (hour - 20) / 8; 
        } else {
            nightProgress = (hour + 4) / 8; 
        }
        
        moonX = 35 + nightProgress * 50;
        const parabola = 1 - Math.pow((nightProgress * 2 - 1), 2);
        moonY = 20 + parabola * 15;
        moonOpacity = 1;
        
        sunOpacity = 0;
        sunX = -50;
        sunY = 100;
    } else {
        const dawnProgress = (hour - 4) / 2; 
        moonX = 85 - dawnProgress * 50;
        moonY = 35 + dawnProgress * 25;
        moonOpacity = 1 - dawnProgress; 
        
        sunX = 5 + dawnProgress * 5;
        sunY = 40 - dawnProgress * 25;
        sunOpacity = dawnProgress; 
    }
    
    sun.style.left = sunX + '%';
    sun.style.top = sunY + '%';
    sun.style.opacity = sunOpacity;
    
    moon.style.left = moonX + '%';
    moon.style.top = moonY + '%';
    moon.style.opacity = moonOpacity;
}

function updateSkyColors() {
    const hour = currentHour;
    
    sky.classList.remove('dawn', 'day', 'dusk', 'night');
    sky.classList.remove(...seasonClasses);
    
    sky.classList.add(seasonClasses[currentSeason]);
    
    if (hour >= 4 && hour < 6) {
        sky.classList.add('dawn');
    } else if (hour >= 6 && hour < 18) {
        sky.classList.add('day');
    } else if (hour >= 18 && hour < 20) {
        sky.classList.add('dusk');
    } else {
        sky.classList.add('night');
    }
    
    if (hour >= 20 || hour < 6) {
        starsContainer.style.opacity = 1;
    } else {
        starsContainer.style.opacity = 0;
    }
    
    if (hour >= 20 || hour < 6) {
        cloudsContainer.style.opacity = 0.3; 
    } else {
        cloudsContainer.style.opacity = 0.8; 
    }
}

function updateSeason() {
    const seasonProgress = (currentTime % TOTAL_YEAR_DURATION) / TOTAL_YEAR_DURATION;
    const newSeason = Math.floor(seasonProgress * 4);
    
    if (newSeason !== currentSeason) {
        currentSeason = newSeason;
        updateSeasonClass();
    }

    const MONTH_DURATION = SEASON_DURATION / 3; 
    const seasonTime = (currentTime % TOTAL_YEAR_DURATION) % SEASON_DURATION;
    const monthIndexInSeason = Math.floor(seasonTime / MONTH_DURATION);
    
    currentMonth = seasonMonths[currentSeason][monthIndexInSeason];
}
function updateSeasonClass() {
    seasonClasses.forEach(className => {
        sky.classList.remove(className);
    });
    
    sky.classList.add(seasonClasses[currentSeason]);
    seasonDisplay.textContent = seasons[currentSeason];
}

function updateDisplay() {
    const hours = Math.floor(currentHour);
    const minutes = Math.floor((currentHour % 1) * 60);
    const timeString = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
    timeDisplay.textContent = timeString;
    
    seasonDisplay.textContent = seasons[currentSeason];
    
    monthDisplay.textContent = months[currentMonth];
}

function startSimulation() {
    setInterval(() => {
        currentTime += UPDATE_INTERVAL / 1000; 
        
        updateSeason();
        
        updateCelestialBodies();
        
        updateSkyColors();
        
        updateDisplay();
    }, UPDATE_INTERVAL);
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createClouds();
    }, 250);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}





