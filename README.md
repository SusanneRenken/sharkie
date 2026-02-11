# Sharkie - 2D Side-Scrolling Underwater Adventure Game

Sharkie is a 2D side-scrolling underwater adventure game developed using vanilla JavaScript, HTML5 Canvas, and CSS. Players control a shark character navigating through procedurally generated levels, collecting coins, avoiding hazardous enemies, and battling an endboss to complete the game. The game features smooth animations, collision detection, sound effects, and responsive controls for an engaging gameplay experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

## Features

- **Character Movement**: Intuitive keyboard controls for swimming, jumping, and attacking with fin slaps and bubble traps.
- **Enemy AI**: Multiple enemy types including jellyfish, pufferfish, and an endboss with distinct behaviors and attack patterns.
- **Collectibles**: Coins for scoring and poison bottles that can be used as weapons against enemies.
- **Collision Detection**: Precise hitbox-based collision system for interactions between character, enemies, barriers, and collectibles.
- **Status Bars**: Visual health and coin counters with animated updates.
- **Sound Effects**: Immersive audio feedback for actions, collisions, and background ambiance.
- **Responsive Design**: Optimized for desktop browsers with scalable canvas rendering.
- **Game States**: Menu screens, gameplay loops, and win/lose conditions with leaderboard tracking.

## Tech Stack

### Frontend
- **HTML5**: Canvas element for game rendering and DOM structure
- **CSS3**: Styling for UI elements, animations, and responsive layout
- **JavaScript (ES6+)**: Game logic, object-oriented programming with class-based architecture

### Assets
- **Audio**: MP3 and WAV files for sound effects and background music
- **Images**: PNG spritesheets for characters, enemies, backgrounds, and UI elements

## System Requirements

- Modern web browser with HTML5 Canvas support
- Minimum screen resolution: 1024x768
- Audio output for sound effects

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sharkie.git
   cd sharkie
   ```

2. Open `index.html` in your web browser to start the game.

For development with a local server (recommended for asset loading):
```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
sharkie/
├── index.html                 # Main HTML file with canvas element
├── script.js                  # Main game script and initialization
├── style.css                  # Global styles and UI styling
├── legal-notice.html          # Legal information page
├── LICENSE                    # Project license
├── audio/                     # Sound effects and background music
├── img/                       # Game assets and sprites
│   ├── background/            # Level backgrounds and layers
│   ├── character/             # Shark character animations
│   ├── enemy/                 # Enemy sprites (jellyfish, pufferfish, endboss)
│   ├── collectibles/          # Coins and poison bottles
│   └── menuscreen/            # Menu and UI elements
├── models/                    # Game object classes
│   ├── character.class.js     # Player character logic
│   ├── endboss.class.js       # Final boss enemy
│   ├── jellyfish.class.js     # Jellyfish enemy
│   ├── pufferfish.class.js    # Pufferfish enemy
│   ├── movable-object.class.js # Base class for moving entities
│   ├── drawable-object.class.js # Base class for renderable objects
│   └── ...                    # Additional game object classes
├── helper/                    # Utility functions and game logic
│   ├── character-helper.js    # Character-specific utilities
│   ├── world-collision.js     # Collision detection system
│   ├── sounds.js              # Audio management
│   └── ...                    # Additional helper modules
└── style/                     # Additional CSS files
    ├── font.css               # Font definitions
    └── legal-notice.css       # Legal page styling
```

## Deployment

The game can be deployed to any static web hosting service:

### GitHub Pages
1. Push the project to a GitHub repository
2. Go to repository Settings > Pages
3. Select "Deploy from a branch" and choose `main` branch
4. The game will be available at `https://sharkie.susanne-renken.com`

### Other Platforms
- Netlify: Connect repository and deploy automatically
- Vercel: Import project and deploy with zero configuration
- Firebase Hosting: Use `firebase deploy` after setup

No build process is required as the game runs directly in the browser.
