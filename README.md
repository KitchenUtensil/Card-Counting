# 🃏 Blackjack Card Counter

A fully functional Blackjack card counting game with Hi-Lo counting system, realistic casino-style interface, and comprehensive betting mechanics.

## 🎮 Features

### 💰 Bankroll & Betting System
- **Initial Bankroll Setup**: Start with any amount $100 or higher
- **Chip Denominations**: $1, $5, $25, $100 chips with visual selection
- **Interactive Betting**: Click chips to select, then click betting circle to place bets
- **Bet Management**: Clear bets, track current bet amount

### 🃏 Card System
- **Standard 52-Card Deck**: Multiple decks (2 or 6) based on shoe size
- **Full Card Display**: Numbers 2-10, J, Q, K, A with suits (♠, ♥, ♦, ♣)
- **Realistic Card Design**: Clean, modern card appearance with hover effects
- **Face-Down Cards**: Dealer's hole card properly hidden during play
- **Proper Deck Composition**: 2 decks = 2 of each card, 6 decks = 6 of each card

### 📊 Card Counting (Hi-Lo System)
- **Running Count Display**: Toggle to show/hide the current count
- **Automatic Counting**: 
  - Low cards (2-6): +1
  - High cards (10, J, Q, K, A): -1
  - Neutral cards (7, 8, 9): 0
- **Deck Tracking**: Shows remaining decks in format "X.XX decks left"
- **Shuffle Alert**: Automatic reshuffle at ~25% remaining with visual notification

### 🎯 Blackjack Rules
- **Standard House Rules**:
  - Blackjack pays 3:2
  - Dealer hits on soft 17
  - Double down allowed on any two cards
  - Splitting allowed (up to 3 splits for 4 total hands)
  - Resplitting Aces allowed
  - No hitting after splitting Aces (one card per split Ace)

### 🎨 User Interface
- **Modern Casino Design**: Green felt background with professional styling
- **Responsive Layout**: Works on desktop and mobile devices
- **Smooth Animations**: Card dealing, chip placement, and UI transitions
- **Clear Game State**: Visual indicators for active hands, current bets, and game status

## 🚀 How to Play

### 1. Game Setup
1. Open `index.html` in your web browser
2. Enter your initial bankroll (minimum $100)
3. Select number of decks (2 or 6)
4. Click "Start Game"

### 2. Betting Phase
1. **Select a Chip**: Click on any chip denomination ($1, $5, $25, $100)
2. **Place Your Bet**: Click on the betting circle to place the selected chip
3. **Adjust Bet**: Add more chips or use "Clear Bet" to start over
4. **Deal Cards**: Click "Deal" when ready to play

### 3. Gameplay
- **Hit**: Take another card
- **Stand**: Keep your current hand
- **Double Down**: Double your bet and take exactly one more card
- **Split**: Split matching cards into separate hands (requires equal bet)

### 4. Card Counting
- Click "Show Count" to reveal the running count
- Use the count to adjust your betting strategy
- Higher positive counts favor the player
- Higher negative counts favor the dealer

## 🎯 Strategy Tips

### Basic Blackjack Strategy
- Always hit on hard totals of 8 or less
- Always stand on hard totals of 17 or higher
- Hit on soft totals of 17 or less
- Double down on 11 when possible
- Split 8s and Aces

### Card Counting Strategy
- **Positive Count (+2 or higher)**: Increase bet size
- **Negative Count (-2 or lower)**: Decrease bet size or skip hands
- **Neutral Count (-1 to +1)**: Use basic strategy with minimum bets

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🛠️ Technical Details

### Files Structure
```
card/
├── index.html      # Main game interface
├── styles.css      # Game styling and animations
├── script.js       # Game logic and card counting
└── README.md       # This file
```

### Key Features Implemented
- ✅ Hi-Lo card counting system
- ✅ Multiple deck support (2 or 6 decks)
- ✅ Automatic shuffle at 25% remaining
- ✅ Complete Blackjack rules implementation
- ✅ Splitting and resplitting functionality
- ✅ Double down mechanics
- ✅ Realistic betting system
- ✅ Responsive design
- ✅ Smooth animations and transitions

## 🎲 Game Mechanics

### Card Values
- **Number Cards (2-10)**: Face value
- **Face Cards (J, Q, K)**: 10 points
- **Aces**: 1 or 11 points (player's choice)

### Winning Conditions
- **Blackjack**: Natural 21 (pays 3:2)
- **Win**: Beat dealer's total without busting
- **Push**: Tie with dealer (bet returned)
- **Lose**: Bust or lower total than dealer

### Card Counting Benefits
- **Positive Count**: More high cards remaining, favorable to player
- **Negative Count**: More low cards remaining, favorable to dealer
- **True Count**: Running count ÷ decks remaining (advanced strategy)

## 🎉 Enjoy the Game!

This Blackjack Card Counter provides a realistic casino experience with the added challenge of card counting. Practice your skills, develop your strategy, and see if you can beat the house!

---

*Note: This is a simulation game for entertainment and educational purposes. Card counting is not illegal, but casinos may ask players to leave if they detect counting behavior.* 