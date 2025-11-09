# Full Day Cycle Simulation

A realistic sky simulation featuring a complete day-night cycle and seasonal year cycle. Watch the sun and moon traverse across the sky, stars twinkle at night, clouds drift by, and experience the changing colors of the sky through different seasons and times of day.

## 🌟 Features

### Sky Animation
- **Sunrise → Day → Sunset → Night Cycle**: Smooth 24-hour day cycle with realistic transitions
- **Celestial Body Movement**: Sun and moon move along smooth parabolic paths across the sky
- **Dynamic Sky Gradients**: Sky colors change smoothly according to time of day (dawn, day, dusk, night)
- **Starfield**: 150+ stars appear at night with natural twinkling effects
- **Moving Clouds**: 10 animated clouds of varying sizes (small, medium, large) drift across the sky during the day

### Seasonal Changes
- **Four Seasons**: Spring, Summer, Autumn, and Winter
- **Seasonal Sky Colors**: Each season has unique color palettes for different times of day
- **Month Progression**: Months are aligned with seasons and progress automatically
  - **Spring**: March, April, May
  - **Summer**: June, July, August
  - **Autumn**: September, October, November
  - **Winter**: December, January, February
- **10-Minute Year Cycle**: Complete year cycle (all 4 seasons) completes in 10 minutes
  - Each season lasts 2.5 minutes
  - Each month lasts 50 seconds

### User Interface
- **Real-time Info Display**: Shows current time, season, and month
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Clean & Modern UI**: Bootstrap 5 powered interface with smooth animations

## 🛠️ Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, animations, and transitions
- **JavaScript**: Simulation logic and dynamic updates
- **Bootstrap 5**: Responsive layout and UI components

## 📦 Installation

1. Clone the repository or download the project files
   ```bash
   git clone <repository-url>
   cd "full-day cycle simulation"
   ```

2. Open `index.html` in a web browser
   - No build process required
   - No dependencies to install
   - Works directly in any modern web browser

## 🚀 Usage

1. Open `index.html` in your web browser
2. The simulation starts automatically at 6:00 AM in Spring (March)
3. Watch the simulation run through:
   - **Day Cycle**: 4 minutes for a complete 24-hour day
   - **Year Cycle**: 10 minutes for a complete year (all 4 seasons)

### Simulation Timing

- **Day Duration**: 4 minutes (240 seconds) = 24 hours
  - Each hour = 10 seconds
- **Season Duration**: 2.5 minutes (150 seconds) per season
- **Month Duration**: 50 seconds per month
- **Total Year Duration**: 10 minutes (600 seconds)

## 📁 Project Structure

```
full-day cycle simulation/
│
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # Simulation logic
└── README.md           # Project documentation
```

## 🎮 How It Works

### Day/Night Cycle
- The simulation cycles through a 24-hour day in 4 minutes
- Sun rises at 6:00 AM, reaches peak at noon, and sets at 6:00 PM
- Moon appears after sunset and moves across the night sky
- Stars appear during night hours (8:00 PM - 6:00 AM)
- Sky colors transition smoothly between dawn, day, dusk, and night

### Seasonal Cycle
- Four seasons cycle continuously
- Each season has unique sky color palettes
- Months progress automatically with their respective seasons
- The year cycle repeats infinitely

### Animations
- **Sun & Moon**: Move along parabolic paths using JavaScript calculations
- **Stars**: CSS animations with random delays for twinkling effect
- **Clouds**: CSS keyframe animations with varying speeds and delays
- **Sky Gradients**: Smooth CSS transitions between different color schemes

## 🎨 Customization

### Adjusting Simulation Speed
Edit the constants in `script.js`:
```javascript
const DAY_DURATION = 240;        // Change day cycle duration (in seconds)
const SEASON_DURATION = 150;     // Change season duration (in seconds)
const UPDATE_INTERVAL = 100;     // Change update frequency (in milliseconds)
```

### Adjusting Visual Elements
- **Star Count**: Modify `starCount` in `createStars()` function
- **Cloud Count**: Modify `cloudCount` in `createClouds()` function
- **Colors**: Edit seasonal color schemes in `style.css`

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🎯 Features Overview

| Feature | Description |
|---------|-------------|
| Day/Night Cycle | 24-hour cycle in 4 minutes |
| Seasonal Changes | 4 seasons with unique colors |
| Month Display | 12 months aligned with seasons |
| Celestial Bodies | Animated sun and moon |
| Starfield | 150+ twinkling stars |
| Moving Clouds | 10 animated clouds |
| Responsive Design | Works on all screen sizes |
| Real-time Updates | Live time, season, and month display |

## 👨‍💻 Developer

**Developed by Mohamed Osman - 2025**

## 📄 License

This project is open source and available for educational and personal use.

## 🙏 Acknowledgments

- Bootstrap 5 for the responsive framework
- Modern web standards for smooth animations and transitions

---

**Enjoy watching the sky change throughout the day and year!** 🌅🌇🌙⭐

