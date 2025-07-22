class BlackjackGame {
    constructor() {
        this.deck = [];
        this.playerHands = [];
        this.dealerHand = [];
        this.currentHandIndex = 0;
        this.bankroll = 0;
        this.currentBet = 0;
        this.selectedChip = null;
        this.runningCount = 0;
        this.totalDecks = 6;
        this.cardsDealt = 0;
        this.gameInProgress = false;
        this.countVisible = false;
        
        this.initializeEventListeners();
        this.showSetupModal();
    }

    initializeEventListeners() {
        // Setup modal
        document.getElementById('start-game-btn').addEventListener('click', () => this.startGame());
        
        // Chip selection
        document.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', (e) => this.selectChip(e.target));
        });
        
        // Betting circle
        document.getElementById('betting-circle').addEventListener('click', () => this.placeBet());
        
        // Game controls
        document.getElementById('deal-btn').addEventListener('click', () => this.dealCards());
        document.getElementById('clear-bet-btn').addEventListener('click', () => this.clearBet());
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
        
        // Action buttons
        document.getElementById('hit-btn').addEventListener('click', () => this.hit());
        document.getElementById('stand-btn').addEventListener('click', () => this.stand());
        document.getElementById('double-btn').addEventListener('click', () => this.doubleDown());
        document.getElementById('split-btn').addEventListener('click', () => this.split());
        
        // Count toggle
        document.getElementById('count-toggle').addEventListener('click', () => this.toggleCount());
        

    }

    showSetupModal() {
        document.getElementById('setup-modal').style.display = 'flex';
    }

    startGame() {
        const initialBankroll = parseInt(document.getElementById('initial-bankroll').value);
        const shoeSize = parseInt(document.getElementById('shoe-size').value);
        

        
        if (initialBankroll < 100) {
            alert('Please enter a bankroll of at least $100');
            return;
        }
        
        this.bankroll = initialBankroll;
        this.totalDecks = shoeSize;
        this.initializeDeck();
        this.updateDisplay();
        
        document.getElementById('setup-modal').style.display = 'none';
    }

    initializeDeck() {
        this.deck = [];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suits = ['♠', '♥', '♦', '♣'];
        
        // Create multiple decks based on shoe size
        // Each deck has 52 cards (13 ranks × 4 suits)
        for (let deck = 0; deck < this.totalDecks; deck++) {
            for (let suit of suits) {
                for (let rank of ranks) {
                    this.deck.push({ rank: rank, suit: suit });
                }
            }
        }
        
        this.initialShuffle();
        this.updateDeckInfo();
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        this.cardsDealt = 0;
        this.runningCount = 0;
        this.showShuffleAlert();
    }

    initialShuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        this.cardsDealt = 0;
        this.runningCount = 0;
    }

    showShuffleAlert() {
        const alert = document.getElementById('shuffle-alert');
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 3000);
    }

    updateDeckInfo() {
        const cardsRemaining = this.deck.length;
        const decksRemaining = (cardsRemaining / 52).toFixed(2);
        document.getElementById('decks-left').textContent = `${decksRemaining} decks left`;
    }

    checkForShuffle() {
        const cardsRemaining = this.deck.length;
        const shuffleThreshold = this.totalDecks * 52 * 0.25;
        
        // Check if shuffle is needed (~25% remaining) - but not during initial setup
        if (this.gameInProgress && cardsRemaining < shuffleThreshold) {
            console.log(`Shuffling deck: ${cardsRemaining} cards remaining (${(cardsRemaining / 52).toFixed(2)} decks)`);
            this.shuffleDeck();
        }
    }

    updateDeckDisplay() {
        const cardsRemaining = this.deck.length;
        const decksRemaining = (cardsRemaining / 52).toFixed(2);
        document.getElementById('decks-left').textContent = `${decksRemaining} decks left`;
    }

    selectChip(chipElement) {
        // Remove previous selection
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
        
        // Select new chip
        chipElement.classList.add('selected');
        this.selectedChip = parseInt(chipElement.dataset.value);
        
        // Add animation
        chipElement.classList.add('placed');
        setTimeout(() => chipElement.classList.remove('placed'), 300);
    }

    placeBet() {
        if (!this.selectedChip || this.gameInProgress) return;
        
        if (this.selectedChip > this.bankroll) {
            alert('Insufficient funds!');
            return;
        }
        
        this.currentBet += this.selectedChip;
        this.bankroll -= this.selectedChip;
        this.updateDisplay();
        
        // Enable deal button if bet is placed
        if (this.currentBet > 0) {
            document.getElementById('deal-btn').disabled = false;
        }
    }

    clearBet() {
        if (this.gameInProgress) return;
        
        this.bankroll += this.currentBet;
        this.currentBet = 0;
        this.updateDisplay();
        document.getElementById('deal-btn').disabled = true;
    }

    dealCards() {
        if (this.currentBet === 0 || this.gameInProgress) return;
        
        // Clear previous cards when starting new round
        this.clearCards();
        
        this.gameInProgress = true;
        this.playerHands = [[]];
        this.dealerHand = [];
        this.currentHandIndex = 0;
        
        // Deal initial cards one by one with delays
        this.dealCardToPlayer(0, true);
        
        setTimeout(() => {
            this.dealCardToDealer(true);
            
            setTimeout(() => {
                this.dealCardToPlayer(0, true);
                
                setTimeout(() => {
                    this.dealCardToDealer(false); // Face down
                    
                    setTimeout(() => {
                        this.updateDisplay();
                        this.showActionButtons();
                        
                        // Check for natural blackjack (2 cards totaling 21)
                        if (this.calculateHandValue(this.playerHands[0]) === 21 && this.playerHands[0].length === 2) {
                            this.stand();
                        }
                    }, 300);
                }, 400);
            }, 400);
        }, 400);
    }

    dealCardToPlayer(handIndex, faceUp = true) {
        if (this.deck.length === 0) return;
        
        const card = this.deck.pop();
        this.playerHands[handIndex].push(card);
        
        // Only count cards that are face up
        if (faceUp) {
            this.updateCardCount(card);
        }
        
        this.displayPlayerCards(handIndex);
        this.displayPlayerTotal(handIndex);
        
        // Check if shuffle is needed
        this.checkForShuffle();
    }

    dealCardToDealer(faceUp = true) {
        if (this.deck.length === 0) return;
        
        const card = this.deck.pop();
        this.dealerHand.push(card);
        
        // Only count cards that are face up
        if (faceUp) {
            this.updateCardCount(card);
        }
        
        this.displayDealerCards();
        this.displayDealerTotal();
        
        // Check if shuffle is needed
        this.checkForShuffle();
    }

    updateCardCount(card) {
        // Hi-Lo counting system
        if (['2', '3', '4', '5', '6'].includes(card.rank)) {
            this.runningCount += 1;
        } else if (['10', 'J', 'Q', 'K', 'A'].includes(card.rank)) {
            this.runningCount -= 1;
        }
        // 7, 8, 9 are neutral (0)
        
        this.updateCountDisplay();
    }

    updateCountDisplay() {
        const countElement = document.getElementById('running-count');
        countElement.textContent = this.runningCount;
        
        if (this.countVisible) {
            countElement.style.display = 'inline';
        }
    }

    toggleCount() {
        this.countVisible = !this.countVisible;
        const countElement = document.getElementById('running-count');
        const toggleBtn = document.getElementById('count-toggle');
        
        if (this.countVisible) {
            countElement.style.display = 'inline';
            toggleBtn.textContent = 'Hide Count';
        } else {
            countElement.style.display = 'none';
            toggleBtn.textContent = 'Show Count';
        }
    }

    addCardAnimation(containerId, card) {
        const container = document.getElementById(containerId);
        const cardElement = this.createCardElement(card);
        cardElement.classList.add('dealt');
        container.appendChild(cardElement);
        
        setTimeout(() => cardElement.classList.remove('dealt'), 500);
    }

    createCardElement(card, faceDown = false) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        if (faceDown) {
            cardElement.classList.add('face-down');
        } else {
            // Display rank and suit
            cardElement.innerHTML = `<div class="card-rank">${card.rank}</div><div class="card-suit">${card.suit}</div>`;
            
            if (card.rank === 'A') {
                cardElement.classList.add('ace');
            }
            if (['♥', '♦'].includes(card.suit)) {
                cardElement.classList.add('red');
            }
        }
        
        return cardElement;
    }

    displayPlayerCards(handIndex) {
        const container = document.getElementById(`player-cards-${handIndex}`);
        container.innerHTML = '';
        
        this.playerHands[handIndex].forEach((card, index) => {
            const cardElement = this.createCardElement(card);
            // Add animation to the last card (newly dealt card)
            if (index === this.playerHands[handIndex].length - 1) {
                cardElement.classList.add('dealt');
                setTimeout(() => cardElement.classList.remove('dealt'), 500);
            }
            container.appendChild(cardElement);
        });
        
        // Update deck display after showing cards
        this.updateDeckDisplay();
    }

    displayDealerCards() {
        const container = document.getElementById('dealer-cards');
        container.innerHTML = '';
        
        this.dealerHand.forEach((card, index) => {
            const faceDown = index === 1 && this.gameInProgress && this.currentHandIndex < this.playerHands.length;
            const cardElement = this.createCardElement(card, faceDown);
            // Add animation to the last card (newly dealt card)
            if (index === this.dealerHand.length - 1) {
                cardElement.classList.add('dealt');
                setTimeout(() => cardElement.classList.remove('dealt'), 500);
            }
            container.appendChild(cardElement);
        });
        
        // Update deck display after showing cards
        this.updateDeckDisplay();
    }

    displayPlayerTotal(handIndex) {
        const total = this.calculateHandValue(this.playerHands[handIndex]);
        const container = document.getElementById(`player-total-${handIndex}`);
        container.textContent = `Total: ${total}`;
    }

    displayDealerTotal() {
        let total;
        if (this.gameInProgress && this.currentHandIndex < this.playerHands.length) {
            // Hide dealer's hole card total during play
            total = this.calculateHandValue([this.dealerHand[0]]);
        } else {
            total = this.calculateHandValue(this.dealerHand);
        }
        
        const container = document.getElementById('dealer-total');
        container.textContent = `Total: ${total}`;
    }

    calculateHandValue(hand) {
        let value = 0;
        let aces = 0;
        
        for (let card of hand) {
            if (card.rank === 'A') {
                aces += 1;
            } else if (['K', 'Q', 'J'].includes(card.rank)) {
                value += 10;
            } else {
                value += parseInt(card.rank);
            }
        }
        
        // Add aces
        for (let i = 0; i < aces; i++) {
            if (value + 11 <= 21) {
                value += 11;
            } else {
                value += 1;
            }
        }
        
        return value;
    }

    showActionButtons() {
        const actionButtons = document.getElementById('action-buttons');
        actionButtons.style.display = 'flex';
        this.enableActionButtons();
    }

    hideActionButtons() {
        document.getElementById('action-buttons').style.display = 'none';
    }

    disableActionButtons() {
        document.getElementById('hit-btn').disabled = true;
        document.getElementById('stand-btn').disabled = true;
        document.getElementById('double-btn').disabled = true;
        document.getElementById('split-btn').disabled = true;
    }

    enableActionButtons() {
        const currentHand = this.playerHands[this.currentHandIndex];
        const canDouble = currentHand.length === 2 && this.bankroll >= this.currentBet;
        const canSplit = currentHand.length === 2 && 
                        currentHand[0].rank === currentHand[1].rank && 
                        this.bankroll >= this.currentBet &&
                        this.playerHands.length < 4;
        
        document.getElementById('hit-btn').disabled = false;
        document.getElementById('stand-btn').disabled = false;
        document.getElementById('double-btn').disabled = !canDouble;
        document.getElementById('split-btn').disabled = !canSplit;
    }

    hit() {
        if (this.currentHandIndex >= this.playerHands.length) return;
        
        // Disable action buttons during dealing
        this.disableActionButtons();
        
        this.dealCardToPlayer(this.currentHandIndex);
        
        setTimeout(() => {
            const handValue = this.calculateHandValue(this.playerHands[this.currentHandIndex]);
            
            if (handValue > 21) {
                this.stand(); // Bust, move to next hand or dealer
            } else {
                this.enableActionButtons();
            }
        }, 500);
    }

    stand() {
        this.currentHandIndex++;
        
        if (this.currentHandIndex >= this.playerHands.length) {
            this.playDealerHand();
        } else {
            this.updateActiveHand();
        }
    }

    doubleDown() {
        if (this.bankroll < this.currentBet) return;
        
        // Disable action buttons during double down
        this.disableActionButtons();
        
        this.bankroll -= this.currentBet;
        this.currentBet *= 2;
        
        this.dealCardToPlayer(this.currentHandIndex);
        
        setTimeout(() => {
            this.stand();
        }, 500);
    }

    split() {
        if (this.playerHands.length >= 4) return;
        
        const currentHand = this.playerHands[this.currentHandIndex];
        if (currentHand.length !== 2 || currentHand[0].rank !== currentHand[1].rank) return;
        
        if (this.bankroll < this.currentBet) return;
        
        // Disable action buttons during split
        this.disableActionButtons();
        
        // Create new hand
        this.playerHands.push([currentHand.pop()]);
        this.bankroll -= this.currentBet;
        
        // Deal one card to each split hand with delays
        this.dealCardToPlayer(this.currentHandIndex);
        
        setTimeout(() => {
            this.dealCardToPlayer(this.playerHands.length - 1);
            
            setTimeout(() => {
                this.updatePlayerHandsDisplay();
                this.enableActionButtons();
            }, 500);
        }, 400);
    }

    updatePlayerHandsDisplay() {
        const container = document.getElementById('player-hands');
        container.innerHTML = '';
        
        this.playerHands.forEach((hand, index) => {
            const handElement = document.createElement('div');
            handElement.className = `player-hand ${index === this.currentHandIndex ? 'active' : ''}`;
            handElement.id = `hand-${index}`;
            
            handElement.innerHTML = `
                <div class="player-cards" id="player-cards-${index}"></div>
                <div class="player-total" id="player-total-${index}"></div>
            `;
            
            container.appendChild(handElement);
            this.displayPlayerCards(index);
            this.displayPlayerTotal(index);
        });
    }

    updateActiveHand() {
        document.querySelectorAll('.player-hand').forEach((hand, index) => {
            hand.classList.toggle('active', index === this.currentHandIndex);
        });
    }

    playDealerHand() {
        // Reveal dealer's hole card and count it
        if (this.dealerHand.length >= 2) {
            this.updateCardCount(this.dealerHand[1]); // Count the hole card when revealed
        }
        
        // Reveal dealer's hole card
        this.displayDealerCards();
        this.displayDealerTotal();
        
        // Dealer plays according to house rules (hit on soft 17) with delays
        this.dealerPlayStep();
    }

    dealerPlayStep() {
        const dealerValue = this.calculateHandValue(this.dealerHand);
        
        if (dealerValue < 17) {
            // Dealer needs to hit
            setTimeout(() => {
                this.dealCardToDealer();
                this.dealerPlayStep(); // Continue dealer's play
            }, 600);
        } else {
            // Dealer is done
            setTimeout(() => {
                this.determineWinner();
            }, 500);
        }
    }

    determineWinner() {
        const dealerValue = this.calculateHandValue(this.dealerHand);
        let totalWinnings = 0;
        let results = [];
        
        this.playerHands.forEach((hand, index) => {
            const playerValue = this.calculateHandValue(hand);
            let result = '';
            let winnings = 0;
            
            if (playerValue > 21) {
                result = 'Bust';
                winnings = 0;
            } else if (dealerValue > 21) {
                result = 'Dealer Bust - Win';
                winnings = this.currentBet;
            } else if (playerValue > dealerValue) {
                result = 'Win';
                winnings = this.currentBet;
            } else if (playerValue < dealerValue) {
                result = 'Lose';
                winnings = 0;
            } else {
                result = 'Push';
                winnings = this.currentBet; // Return bet
            }
            
            // Blackjack pays 3:2
            if (playerValue === 21 && hand.length === 2 && result === 'Win') {
                winnings = Math.floor(this.currentBet * 1.5);
                result = 'Blackjack!';
            }
            
            totalWinnings += winnings;
            results.push(`Hand ${index + 1}: ${result}`);
        });
        
        this.bankroll += totalWinnings;
        this.gameInProgress = false;
        this.currentBet = 0;
        
        this.updateDisplay();
        this.hideActionButtons();
        
        // Show results briefly then go to next round
        this.showBriefResults(results, totalWinnings);
    }

    showBriefResults(results, winnings) {
        // Create a temporary results display on the right side
        const resultsDiv = document.createElement('div');
        resultsDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2d5a3d, #1a472a);
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #ffd700;
            color: white;
            text-align: center;
            z-index: 1000;
            font-size: 1em;
            max-width: 200px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        `;
        
        let resultText = '';
        if (winnings > 0) {
            resultText = `You Won $${winnings}!`;
        } else if (winnings === 0) {
            resultText = 'Push';
        } else {
            resultText = 'You Lost';
        }
        
        resultsDiv.innerHTML = `
            <div style="margin-bottom: 8px; font-weight: bold; color: ${winnings > 0 ? '#00ff88' : winnings === 0 ? '#ffd700' : '#ff6b6b'}">${resultText}</div>
            <div style="font-size: 0.8em; color: #87ceeb; line-height: 1.2;">${results.join('<br>')}</div>
        `;
        
        document.body.appendChild(resultsDiv);
        
        // Remove after 2 seconds and start new round
        setTimeout(() => {
            document.body.removeChild(resultsDiv);
            this.resetGameState();
        }, 2000);
    }

    newRound() {
        this.resetGameState();
        // Cards will be cleared when user clicks "Deal" for next round
    }

    newGame() {
        this.showSetupModal();
    }

    resetGameState() {
        this.playerHands = [];
        this.dealerHand = [];
        this.currentHandIndex = 0;
        this.currentBet = 0;
        this.gameInProgress = false;
        
        // Don't clear cards - keep them visible until next deal
        this.updateDisplay();
        this.hideActionButtons();
        document.getElementById('deal-btn').disabled = true;
    }

    clearCards() {
        // Clear displays
        document.getElementById('dealer-cards').innerHTML = '';
        document.getElementById('dealer-total').textContent = '';
        document.getElementById('player-hands').innerHTML = `
            <div class="player-hand active" id="hand-0">
                <div class="player-cards" id="player-cards-0"></div>
                <div class="player-total" id="player-total-0"></div>
            </div>
        `;
    }

    updateDisplay() {
        document.getElementById('bankroll').textContent = `$${this.bankroll}`;
        document.getElementById('current-bet').textContent = `$${this.currentBet}`;
        
        // Update count display
        this.updateCountDisplay();
        
        // Enable/disable deal button
        document.getElementById('deal-btn').disabled = this.currentBet === 0 || this.gameInProgress;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BlackjackGame();
}); 