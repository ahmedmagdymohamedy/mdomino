import React, { useState } from 'react'
import EmptyCards from './EmptyCards'
import HalfCards from './HalfCards'
import ChoseCardsDialog from './ChoseCardsDialog'
import ChoseFromSomeCardes from './ChoseFromSomeCardes'
import * as INT from './Intelligence'


const PlayerOption = ({ playerName, tern, playerID, cards, onClickNext, onClickSkip, onStart, edjsNumber , graoundCards }) => {

    const [showChoseCard, setShowChoseCard] = useState(false)


    const notHaveEdjsCards = () => {
        return INT.playerNotHaveSomeNum(playerID, edjsNumber[0]) && INT.playerNotHaveSomeNum(playerID, edjsNumber[1])
    }

    const handelStart = () => {
        setShowChoseCard(true)
    }


    const handelNextF = (card) => {
        onClickNext(playerID, card)
        setShowChoseCard(false)
    }

    const handelCloseChooseCard = () => {
        setShowChoseCard(false)
    }

    const onClickSkipF = () => {
        onClickSkip(playerID)
    }

    return (
        <div>
            <div className={`player-option player-${playerID}-cards`} >
                <div className="player-option-name">{playerName}</div>
                <EmptyCards cards={cards} />
                <HalfCards notHaveCards={INT.getNotHaveCard(playerID)} />
                {
                    tern === -1 ?
                        <button className="player-option-btn" onClick={handelStart} disabled={!onStart}>Start</button>
                        :
                        tern === +playerID ?
                            <div>
                                {!notHaveEdjsCards() ?
                                    <button className="player-option-btn" onClick={handelStart}>Play</button> : null}
                                <button className="player-option-btn" onClick={onClickSkipF}>Skip</button>
                            </div>
                            : null
                }

            </div>
            {
                showChoseCard ?
                    playerID === 0 ?
                        <ChoseFromSomeCardes titel="Choose Card" handelNext={handelNextF} handelClose={handelCloseChooseCard} cards={cards} edjsNumber={edjsNumber} graoundCards={graoundCards}/>
                        :
                        <ChoseCardsDialog titel="Choose Card" handelNext={handelNextF} handelClose={handelCloseChooseCard} edjsNumber={edjsNumber} playerID={playerID} />
                    : null
            }
        </div>
    )
}

export default PlayerOption 