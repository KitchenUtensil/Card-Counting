# 🚀 GitHub Setup Guide for Blackjack Card Counter

## Prerequisites

### 1. Install Git
Download and install Git from: https://git-scm.com/download/win

### 2. Install GitHub CLI (Optional but Recommended)
Download from: https://cli.github.com/

## Steps to Push to GitHub

### 1. Initialize Git Repository
```bash
git init
```

### 2. Add Your Files
```bash
git add .
```

### 3. Make Initial Commit
```bash
git commit -m "Initial commit: Blackjack Card Counter Game"
```

### 4. Add Remote Repository
```bash
git remote add origin https://github.com/KitchenUtensil/Card-Counting.git
```

### 5. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## Alternative: Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. Clone the repository: https://github.com/KitchenUtensil/Card-Counting
4. Copy your files to the cloned folder
5. Commit and push through the GUI

## Files to Include

Your repository should contain:
- `index.html` - Main game interface
- `styles.css` - Game styling and animations  
- `script.js` - Game logic and card counting
- `README.md` - Comprehensive documentation
- `GITHUB_SETUP.md` - This setup guide

## Repository Description

This is a fully functional Blackjack card counting game with:
- Hi-Lo card counting system
- Multiple deck support (2 or 6 decks)
- Realistic casino-style interface
- Complete betting system
- Card suits and proper deck composition
- Automatic shuffle at 25% remaining
- Smooth card animations

## Live Demo

Once pushed, you can enable GitHub Pages to host the game live at:
`https://kitchenutensil.github.io/Card-Counting/` 