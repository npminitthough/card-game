export enum Symbol { spade , heart, diamond, club }

type Card = {
    value: string,
    symbol: Symbol
}

export class Player {
    name: string;
    hand: Card[] = [];

    constructor(name) {
        this.name = name
    }

    getCard(deck: Card[]) {
        const newCard = deck.pop()
        if (newCard) {
            this.hand.push(newCard)
            return newCard
        }
    }
}

export class BlackJackGame {
    deck: Card[]

    constructor(deck?: Card[]) {
        this.deck = deck || this.createDeck()
    }

    play(dealer: Player, player: Player) {
        player.getCard(this.deck)
        player.getCard(this.deck)
        dealer.getCard(this.deck)
        dealer.getCard(this.deck)

        let playerScore = this.calculateScore(player.hand[0]) + this.calculateScore(player.hand[1])
        let dealerScore = this.calculateScore(dealer.hand[0]) + this.calculateScore(dealer.hand[1])
    
        if (playerScore === 21) return player.name
        if (dealerScore === 21) return dealer.name

        while(playerScore < 17) {
            const card = player.getCard(this.deck)
            if (card) {
                const score = this.calculateScore(card)
                playerScore += score
                if (playerScore > 21) return dealer.name
                if (playerScore === 21) return player.name
            } else {
                break;
            }
        }

        while(dealerScore < playerScore) {
            const card = dealer.getCard(this.deck)
            if (card) {
                const score = this.calculateScore(card)
                dealerScore += score
                if (dealerScore > 21) return player.name
                if (dealerScore === 21) return dealer.name
            } else {
                break;
            }
        }
        
    }

    calculateScore(card: Card) {
        let score: number

        switch (card.value) {
            case 'Q':
            case 'K':
            case 'J':
                score = 10
                break;
            case 'A':
                score = 11
                break;
            default:
                score = parseInt(card.value)
                break;
        }

        return score
    }

    createDeck () {
        const set = ['2','3','4','5','6','7','8','9','10','A', 'Q', 'K', 'J']
        const symbols = [Symbol.spade, Symbol.heart, Symbol.diamond, Symbol.club]
        const deck: Card[] = []

        for (let i=0; i<set.length; i++) {
            for (let j=0; j<symbols.length; j++) {
                deck.push({
                    value: set[i],
                    symbol: symbols[j]
                })
            }
        }

        return deck
    }

    shuffleDeck () {
        for (let i = 0; i<this.deck.length; i++) {
            const randIdx: number = Math.floor(Math.random() * this.deck.length)
            const tmp = this.deck[i]
            this.deck[i] = this.deck[randIdx]
            this.deck[randIdx] = tmp
        }
    }
}