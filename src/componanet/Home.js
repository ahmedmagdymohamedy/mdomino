/* eslint-disable default-case */
import React, { useState } from 'react'
import ChoseCardsDialog from './ChoseCardsDialog'
import PlayerOption from './PlayerOption'
import GroundCards from './GroundCards'
import * as INT from './Intelligence'


const Home = () => {
    
    const emptycards = require('../dominos.json').emptyDominos


    const [player0Cards, setPlayer0Cards] = useState([...emptycards])
    const [player1Cards, setPlayer1Cards] = useState([...emptycards])
    const [player2Cards, setPlayer2Cards] = useState([...emptycards])
    const [player3Cards, setPlayer3Cards] = useState([...emptycards])
    const [graoundCards, setGraoundCards] = useState([])
    const [selectionCardesNumber, setSelectionCardesNumber] = useState(1)
    const [stateBar, setStateBar] = useState("")
    const [startGame, setStartGame] = useState(false)
    const [tern, setTern] = useState(-1);
    const [edjsNumber, setEdjsNumber] = useState([-1, -1])



    const moveTern = (a = -2) => {
        a === -2 ?
            tern === 3 ?
                setTern(0) :
                setTern(tern + 1)
            :
            a === 3 ?
                setTern(0) :
                setTern(a + 1)

    }

    const changeStateBar = (newState) => {
        setStateBar(newState)
        setTimeout(() => { setStateBar("") }, 3000)
    }

    const setGraoundNumbers = (newCard, card) => {
        const addCardToLast = (last) => {
            let res = last
            res.push(newCard)
            return res
        }
        const addCardTofirst = (last) => {
            let res = last
            res.unshift(newCard)
            return res
        }

        if (graoundCards.length === 0) {
            setGraoundCards(addCardToLast(graoundCards))
            setEdjsNumber([card.first, card.second])
        } else {
            if (card.first === edjsNumber[0]) {
                setGraoundCards(addCardTofirst(graoundCards))
                setEdjsNumber([card.second, edjsNumber[1]])
            } else if (card.first === edjsNumber[1]) {
                setGraoundCards(addCardToLast(graoundCards))
                setEdjsNumber([edjsNumber[0], card.second])
            }
        }

    }

    const setCartToPlayer = (playerID, cardID) => {
        const addCardToLast = (last) => {
            let theLast = last
            theLast.push(INT.getCartByID(cardID))
            theLast.shift()
            return (theLast)
        }
        playerID === 0 ?
            setPlayer0Cards(addCardToLast(player0Cards))
            :
            playerID === 1 ?
                setPlayer1Cards(addCardToLast(player1Cards))
                :
                playerID === 2 ?
                    setPlayer2Cards(addCardToLast(player2Cards))
                    :
                    setPlayer3Cards(addCardToLast(player3Cards))
        INT.setCartToUsed(cardID)
    }


    const handelSubmitNext = (card) => {
        if (INT.isNotUsed(card.id)) {
            setCartToPlayer(0, card.id)

            if (selectionCardesNumber !== 7) {
                setSelectionCardesNumber(selectionCardesNumber + 1)
            }
            if (selectionCardesNumber === 7) {
                setPlayer1Cards([...emptycards])
                setPlayer2Cards([...emptycards])
                setPlayer3Cards([...emptycards])
                INT.setPlayer0NotHaveCards(player0Cards)
                setStartGame(true)
            }

        } else {
            changeStateBar("This Card Has Been Used")
        }


    }

    const handelCloseStartCardsChoose = () => {
        changeStateBar("You Should choose 7 cards")
    }

    const removeCardFromList = (list, cardID) => {
        let theLast = list.filter(e => e.id !== cardID)
        return (theLast)
    }

    const onClickNext = (playerID, card) => {
        const done = () => {
            setGraoundNumbers(INT.getCartByID(card.id), card)
            INT.playerPlay(playerID , card , edjsNumber)
            INT.setPlayer0NotHaveCards(player0Cards)
            moveTern(playerID)
        }
        if (playerID === 0) {
            setPlayer0Cards(removeCardFromList(player0Cards, card.id))
            done()
        } else {
            if (INT.isNotUsed(card.id)) {
                setCartToPlayer(playerID, card.id)
                done()
            } else {
                changeStateBar("This Card Has Been Used")
            }
        }
    }


    const onClickSkip = (playerID) => {
        INT.playerSkip(playerID ,edjsNumber)
        moveTern(playerID)
    }


    return (
        <div className="page home">
            {stateBar !== "" ?
                <div className="state-bar">{
                    stateBar
                }</div> :
                null
            }

            <div className="game">
                <GroundCards theCards={graoundCards} />
                <PlayerOption playerName="player 2 (my Friend) " tern={tern} playerID={2} cards={player2Cards} onClickNext={onClickNext} onClickSkip={onClickSkip} onStart={startGame} edjsNumber={edjsNumber} graoundCards={graoundCards}/>
                <PlayerOption playerName="Me " tern={tern} playerID={0} cards={player0Cards} onClickNext={onClickNext} onClickSkip={onClickSkip} onStart={startGame} edjsNumber={edjsNumber} />
                <PlayerOption playerName="player 1 " tern={tern} playerID={1} cards={player1Cards} onClickNext={onClickNext} onClickSkip={onClickSkip} onStart={startGame} edjsNumber={edjsNumber} />
                <PlayerOption playerName="player 3" tern={tern} playerID={3} cards={player3Cards} onClickNext={onClickNext} onClickSkip={onClickSkip} onStart={startGame} edjsNumber={edjsNumber} />
            </div>
            {!startGame ?
                <ChoseCardsDialog titel="select 7 cards you have " handelNext={handelSubmitNext} handelClose={handelCloseStartCardsChoose} edjsNumber={edjsNumber} playerID={0} />
                : null
            }
        </div>
    )
}


export default Home

