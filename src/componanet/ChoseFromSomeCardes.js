import React from 'react'
import * as INT from './Intelligence'


const ChoseFromSomeCardes = ({ titel, cards, handelNext, handelClose, edjsNumber , graoundCards }) => {



    let avaliableCards = [];
    if (edjsNumber[0] === -1) {
        avaliableCards = cards
    } else {
        avaliableCards = cards.filter(e => (e.first === edjsNumber[0] || e.first === edjsNumber[1] ||
            e.second === edjsNumber[0] || e.second === edjsNumber[1]))
    }

    const handelNextF = (e) => {
        e.preventDefault();
        const cardID = +e.target.theCard.value
        const theCard = INT.getCartByID(cardID)
        let prop = {}
        if (theCard.first === edjsNumber[0] || theCard.first === edjsNumber[1]) {
            prop = {
                id: cardID,
                first: theCard.first,
                second: theCard.second
            }
        } else {
            prop = {
                id: cardID,
                first: theCard.second,
                second: theCard.first
                }
        }

        handelNext(prop);
    }


    return (<div className="chose-cards" >
        <form onSubmit={handelNextF} >
            <div className="chose-cards-titel"> {titel} : </div>
            <button className="X-btn" type="button" onClick={handelClose}>X</button>
            <div>
                {avaliableCards.map(e => (
                    <div  key={e.id} style={{display:"inline-block"}} >  <div> {INT.getRatio(e.id , cards , edjsNumber , graoundCards)} </div>
                        <label>
                            <input type="radio" name="theCard" value={e.id} />
                            <img alt="0" src={require(`../img/${e.first}-${e.second}.png`)} />
                        </label>
                    </div>
                ))
                }
            </div>
            <button type="submit" className="chose-cards-next-btn">Next</button>
        </form>
    </div>)


}

export default ChoseFromSomeCardes