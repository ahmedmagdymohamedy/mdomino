
const allDominos = require('../dominos.json').dominos


export const getCardID = (firstNum, secondNum) => {
    let res = 28;
    allDominos.forEach(e => {
        if (firstNum === e.first && secondNum === e.second) {
            res = e.id;
        } else if (firstNum === e.second && secondNum === e.first) {
            res = e.id;
        }

    })
    return res
}

export const getNotUsedCards = () => {
    return allDominos.filter(e => e.isUsed === false)
}

export const getUsedCards = () => {
    return allDominos.filter(e => e.isUsed === true)
}

export const getCartByID = (id) => {
    let res = {}
    allDominos.forEach(e => {
        if (id === e.id) {
            res = e
        }
    })
    return res
}

export const isNotUsed = (cardID) => {
    const usedCards = getUsedCards()
    let res = true;
    usedCards.forEach(e => {
        if (e.id === cardID) res = false
    });
    return res
}

export const setCartToUsed = (cardID) => {
    allDominos.forEach((e) => {
        if (e.id === cardID) e.isUsed = true
    })
}

export const getNotUsedCardsForSomeCard = (firstNum) => {
    const unUsedCards = getNotUsedCards()
    let res = []
    unUsedCards.forEach(c => {
        // eslint-disable-next-line
        (c.first === firstNum ? res.push(c) : (c.second === firstNum ? res.push(c) : null))
    })
    return res
}

export const getBuffCards = () => {
    let res = allDominos.filter(e => (
        e.first === e.second
    ))
    return res
}

export const getCardFromCardHave = (cards, cardID) => {
    let theCard = getCartByID(cardID)
    return cards.filter(e => (e.first === theCard.first || e.first === theCard.second ||
        e.second === theCard.first || e.second === theCard.second))
}

export const getCardFromNumberHave = (cards, Num) => {
    return cards.filter(e => (e.first === Num || e.second === Num))
}


export const haveBuff = (cards) => {
    return cards.filter(e => (e.first === e.second))
}








// __________________________________intelligence_________________________________________________________________



let playersOdds = [

    {
        cardCount: 7,
        onPlay: [0, 0, 0, 0, 0, 0, 0],
        played: [0, 0, 0, 0, 0, 0, 0],
        notHave: [0, 0, 0, 0, 0, 0, 0],
        makeDouble: [0, 0, 0, 0, 0, 0, 0],
        otherEdje: [0, 0, 0, 0, 0, 0, 0],

    },

    {
        cardCount: 7,
        onPlay: [0, 0, 0, 0, 0, 0, 0],
        played: [0, 0, 0, 0, 0, 0, 0],
        notHave: [0, 0, 0, 0, 0, 0, 0],
        makeDouble: [0, 0, 0, 0, 0, 0, 0],
        otherEdje: [0, 0, 0, 0, 0, 0, 0],


    },
    {
        cardCount: 7,
        onPlay: [0, 0, 0, 0, 0, 0, 0],
        played: [0, 0, 0, 0, 0, 0, 0],
        notHave: [0, 0, 0, 0, 0, 0, 0],
        makeDouble: [0, 0, 0, 0, 0, 0, 0],
        otherEdje: [0, 0, 0, 0, 0, 0, 0],

    },
    {
        cardCount: 7,
        onPlay: [0, 0, 0, 0, 0, 0, 0],
        played: [0, 0, 0, 0, 0, 0, 0],
        notHave: [0, 0, 0, 0, 0, 0, 0],
        makeDouble: [0, 0, 0, 0, 0, 0, 0],
        otherEdje: [0, 0, 0, 0, 0, 0, 0],

    }
]


export const getRatio = (cardID, cards, edjesNumbers, graoundCards) => {
    let ratio = 50
    const theCard = getCartByID(cardID)

    let theCardWithSort = []
    if (edjesNumbers[0] !== -1) {
        theCard.first === edjesNumbers[0] || theCard.first === edjesNumbers[1] ?
            theCardWithSort = [theCard.first, theCard.second] :
            theCardWithSort = [theCard.second, theCard.first]
    } else {
        theCardWithSort = [theCard.first, theCard.second]
    }



    console.log(playersOdds[1].notHave[theCardWithSort[0]])

    ratio += playersOdds[1].notHave[theCardWithSort[1]] * 15
    ratio += playersOdds[3].notHave[theCardWithSort[1]] * 15
    ratio -= playersOdds[2].notHave[theCardWithSort[1]] * 5

    ratio -= playersOdds[1].played[theCardWithSort[1]] * 5
    ratio -= playersOdds[3].played[theCardWithSort[1]] * 7
    ratio += playersOdds[2].played[theCardWithSort[1]] * 8

    ratio += playersOdds[1].onPlay[theCardWithSort[1]] * 8
    ratio += playersOdds[3].onPlay[theCardWithSort[1]] * 4
    ratio -= playersOdds[2].onPlay[theCardWithSort[1]] * 3

    ratio -= playersOdds[1].makeDouble[theCardWithSort[1]] * 15
    ratio -= playersOdds[3].makeDouble[theCardWithSort[1]] * 15
    ratio += playersOdds[2].makeDouble[theCardWithSort[1]] * 20

    playersOdds[1].onPlay[theCardWithSort[1]] < playersOdds[1].played[theCardWithSort[1]] ?
        ratio -= playersOdds[1].otherEdje[theCardWithSort[1]] * 8 :
        ratio += playersOdds[1].otherEdje[theCardWithSort[1]] * 8
    playersOdds[3].onPlay[theCardWithSort[1]] < playersOdds[3].played[theCardWithSort[1]] ?
        ratio -= playersOdds[3].otherEdje[theCardWithSort[1]] * 8 :
        ratio += playersOdds[3].otherEdje[theCardWithSort[1]] * 8
    playersOdds[2].onPlay[theCardWithSort[1]] < playersOdds[2].played[theCardWithSort[1]] ?
        ratio += playersOdds[2].otherEdje[theCardWithSort[1]] * 8 :
        ratio -= playersOdds[2].otherEdje[theCardWithSort[1]] * 8


    ratio -= playersOdds[1].notHave[theCardWithSort[0]] * 15
    ratio -= playersOdds[3].notHave[theCardWithSort[0]] * 12
    ratio += playersOdds[2].notHave[theCardWithSort[0]] * 6

    ratio += playersOdds[1].played[theCardWithSort[0]] * 8
    ratio -= playersOdds[3].played[theCardWithSort[0]] * 8
    ratio -= playersOdds[2].played[theCardWithSort[0]] * 10

    ratio -= playersOdds[1].onPlay[theCardWithSort[0]] * 8
    ratio -= playersOdds[3].onPlay[theCardWithSort[0]] * 6
    ratio += playersOdds[2].onPlay[theCardWithSort[0]] * 6

    ratio -= playersOdds[1].makeDouble[theCardWithSort[0]] * 15
    ratio -= playersOdds[3].makeDouble[theCardWithSort[0]] * 5
    ratio -= playersOdds[2].makeDouble[theCardWithSort[0]] * 20

    playersOdds[1].onPlay[theCardWithSort[0]] < playersOdds[1].played[theCardWithSort[0]] ?
        ratio += playersOdds[1].otherEdje[theCardWithSort[0]] * 4 :
        ratio -= playersOdds[1].otherEdje[theCardWithSort[0]] * 8
    playersOdds[3].onPlay[theCardWithSort[0]] < playersOdds[3].played[theCardWithSort[0]] ?
        ratio -= playersOdds[3].otherEdje[theCardWithSort[0]] * 8 :
        ratio += playersOdds[3].otherEdje[theCardWithSort[0]] * 4
    playersOdds[2].onPlay[theCardWithSort[0]] < playersOdds[2].played[theCardWithSort[0]] ?
        ratio -= playersOdds[2].otherEdje[theCardWithSort[0]] * 8 :
        ratio += playersOdds[2].otherEdje[theCardWithSort[0]] * 4



    // eslint-disable-next-line no-unused-expressions
    getBuffCards().filter(e => e.id === cardID).length !== 0 ? ratio += 25 : haveBuff(getCardFromCardHave(cards, cardID)).length !== 0 ? ratio -= 10 : null

    // eslint-disable-next-line no-unused-expressions
    haveBuff(getCardFromCardHave(cards, cardID)).length !== 0 ? ratio -= 10 : null

    ratio += (getCardFromCardHave(cards, cardID).length - (parseInt((playersOdds[0].cardCount - 1) / 2))) * 5

    ratio += parseInt((theCardWithSort[0] + theCardWithSort[1]) / 3)

 //ratio += (getCardFromNumberHave(cards, theCardWithSort[0]).length - (getCardFromNumberHave(getNotUsedCards(), theCardWithSort[0]).length - getCardFromNumberHave(graoundCards, theCardWithSort[0]).length)) * 5




    return `${ratio} %`
}

export const playerNotHaveSomeNum = (playerID, cardNum) => {
    return playersOdds[playerID].notHave[cardNum] === 1

}

export const getNotHaveCard = (playerID) => {
    return playersOdds[playerID].notHave
}


export const setPlayer0NotHaveCards = (cards) => {
    let res = [1, 1, 1, 1, 1, 1, 1]
    cards.forEach((e, i) => {
        res[e.first] = 0
        res[e.second] = 0
    })
    playersOdds[0].notHave = res
}





export const playerSkip = (playerID, edjesNumbers) => {
    playersOdds[playerID].notHave[edjesNumbers[0]] = 1
    playersOdds[playerID].notHave[edjesNumbers[1]] = 1

}

export const playerPlay = (playerID, card, edjesNumbers) => {
    playersOdds[playerID].cardCount--
    if (edjesNumbers[0] !== -1) {
        playersOdds[playerID].onPlay[card.first]++
        if (card.first === edjesNumbers[0] && card.second === edjesNumbers[1] || card.first === edjesNumbers[1] && card.second === edjesNumbers[0]) {
            playersOdds[playerID].makeDouble[card.second] = 1
            playersOdds[playerID].otherEdje[card.second]--
        }

        if (card.first === edjesNumbers[0]) {
            playersOdds[playerID].otherEdje[edjesNumbers[1]]++
        } else {
            playersOdds[playerID].otherEdje[edjesNumbers[0]]++
        }

    } else {
        if (card.first === card.second) playersOdds[playerID].makeDouble[card.second] = 1
    }

    playersOdds[playerID].played[card.second]++
}
