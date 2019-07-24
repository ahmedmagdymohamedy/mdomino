import React from 'react'

const GroundCards = ({ theCards }) => {

    const getCardsWithOriantation = (cards) => {

        const getNewCardWithOriantation = (card, oriantation) => {
            return { id: card.id, first: card.first, second: card.second, oriantation: oriantation }
        }

        let res = []
        for (let i = 0; i < cards.length; i++) {
            let newCard = {}
            if (cards.length !== 1) {
                if (i === 0) {
                    if (cards[i].first === cards[i + 1].first) {
                        newCard = getNewCardWithOriantation(cards[i], 1)
                    } else
                        if (cards[i].first === cards[i + 1].second) {
                            newCard = getNewCardWithOriantation(cards[i], 1)
                        } else
                            if (cards[i].second === cards[i + 1].second) {
                                newCard = getNewCardWithOriantation(cards[i], 2)
                            } else
                                if (cards[i].second === cards[i + 1].first) {
                                    newCard = getNewCardWithOriantation(cards[i], 2)
                                }
                } else {
                    if (cards[i].first === cards[i - 1].first) {
                        newCard = getNewCardWithOriantation(cards[i], 2)
                    } else
                        if (cards[i].first === cards[i - 1].second) {
                            newCard = getNewCardWithOriantation(cards[i], 2)
                        } else
                            if (cards[i].second === cards[i - 1].second) {
                                newCard = getNewCardWithOriantation(cards[i], 1)
                            } else
                                if (cards[i].second === cards[i - 1].first) {
                                    newCard = getNewCardWithOriantation(cards[i], 1)
                                }
                }
            }else{
                newCard = getNewCardWithOriantation(cards[i], 1)
            }
            if (cards[i].first === cards[i].second) {
                newCard = getNewCardWithOriantation(cards[i], 0)
            }
            res.push(newCard)
        }
        return res
    }

    return (
        <div className="graound-cards">
            {getCardsWithOriantation(theCards).map((e) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img className={e.oriantation === 1 ? "right-img" : e.oriantation === 2 ? "left-img" : ""} key={e.id} src={require(`../img/${e.first}-${e.second}.png`)} />
            ))
            }

        </div>
    )

}

export default GroundCards