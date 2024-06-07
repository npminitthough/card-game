import { BlackJackGame, Symbol, Player } from "./blackJack"

describe('Player', () => {
    const p1 = new Player('thing')
    it('assigns a name', () => {
        expect(p1.name).toBe('thing')
    })

    it('is initialised with empty hand', () => {
        expect(p1.hand).toStrictEqual([])
    })

    describe('::getCard', () => {
        it('adds a card to the player from the top of the deck', () => {
            const deck = [{value: '1', symbol: Symbol.club}, {value: 'Q', symbol: Symbol.club}]
            p1.getCard(deck)

            expect(deck).toStrictEqual([{value: '1', symbol: Symbol.club}])
            expect(p1.hand).toStrictEqual([{value: 'Q', symbol: Symbol.club}])
        })
    })
})

describe('BlackJackGame', () => {
    
    describe('::play', () => {
        it ('returns "Sam" as winner if Sam has score of 21', () => {
            const dealer = new Player('dealer')
            const player = new Player('sam')
            const deck = [
                {value: '1', symbol: Symbol.club},
                {value: '1', symbol: Symbol.club},
                {value: 'A', symbol: Symbol.club},
                {value: 'J', symbol: Symbol.club}
            ]
            const game = new BlackJackGame(deck)
            expect(game.play(dealer, player)).toBe('sam')
        })
        it ('returns "Dealer" as winner if dealer has score of 21', () => {
            const dealer = new Player('dealer')
            const player = new Player('sam')
            const deck = [
                {value: 'A', symbol: Symbol.club},
                {value: 'J', symbol: Symbol.club},
                {value: '1', symbol: Symbol.club},
                {value: '1', symbol: Symbol.club}
            ]
            const game = new BlackJackGame(deck)
            expect(game.play(dealer, player)).toBe('dealer')
        })
        it ('returns "Dealer" as winner if Sam has score over 21', () => {
            const dealer = new Player('dealer')
            const player = new Player('sam')
            const deck = [
                {value: '10', symbol: Symbol.club},
                {value: '1', symbol: Symbol.club},
                {value: '1', symbol: Symbol.club},
                {value: '4', symbol: Symbol.club},
                {value: 'A', symbol: Symbol.club}
            ]
            const game = new BlackJackGame(deck)
            expect(game.play(dealer, player)).toBe('dealer')
        })
        it ('returns "Sam" as winner if dealer has score over 21', () => {
            const dealer = new Player('dealer')
            const player = new Player('sam')
            const deck = [
                {value: '10', symbol: Symbol.club},
                {value: '8', symbol: Symbol.club},
                {value: '6', symbol: Symbol.club},
                {value: '7', symbol: Symbol.club},
                {value: 'A', symbol: Symbol.club}
            ]
            const game = new BlackJackGame(deck)
            expect(game.play(dealer, player)).toBe('sam')
        })
    })

    describe('::createDeck', () => {
        it('returns array of length 52', () => {
            const game = new BlackJackGame()
            expect(game.deck.length).toBe(52)
        })

        it('accepts custom deck', () => {
            const deck = [{value: 'Q', symbol: Symbol.heart}]
            const game = new BlackJackGame(deck)
            expect(game.deck.length).toBe(1)
        })
    })

    describe('::calculateScore', () => {
        it('returns face value score for numeric card', () => {
            const card = {value: '4', symbol: Symbol.heart}
            const game = new BlackJackGame()
            const actual = game.calculateScore(card)

            expect(actual).toBe(4)
        })

        it('returns 10 for queen card', () => {
            const card = {value: 'Q', symbol: Symbol.heart}
            const game = new BlackJackGame()
            const actual = game.calculateScore(card)

            expect(actual).toBe(10)
        })

        it('returns 11 for ace card', () => {
            const card = {value: 'A', symbol: Symbol.heart}
            const game = new BlackJackGame()
            const actual = game.calculateScore(card)

            expect(actual).toBe(11)
        })
    })
})