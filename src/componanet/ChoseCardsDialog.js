import React, { useState, useEffect } from 'react'
import * as INT from './Intelligence'

const ChoseCardsDialog = ({ titel, handelNext, handelClose, edjsNumber, playerID }) => {


    const [avilableNum, setAvilableNum] = useState([1, 1, 1, 1, 1, 1, 1])

    const handelNextF = (e) => {
        e.preventDefault();

        handelNext({
            id: INT.getCardID(+e.target.firstCard.value, +e.target.secondCard.value),
            first: +e.target.firstCard.value,
            second: +e.target.secondCard.value
        });

        handelChange({ target: { value: +e.target.firstCard.value } })
    }

    const handelChange = (e) => {
        const firstCard = +e.target.value
        const unUsedCards = INT.getNotUsedCardsForSomeCard(firstCard)
        let res = [1, 1, 1, 1, 1, 1, 1]

        unUsedCards.forEach(c => {
            if (c.first === firstCard) {
                res[c.second] = 0
            } else if (c.second === firstCard) {
                res[c.first] = 0
            }
        })
        setAvilableNum(res)
    }

    useEffect(() => {
        let bigEdjNum = 0
        edjsNumber[0] === -1 ? bigEdjNum = 0 : edjsNumber[0] < edjsNumber[1] ? bigEdjNum = edjsNumber[1] : bigEdjNum = edjsNumber[0]
        handelChange({ target: { value: bigEdjNum } })
    }, [edjsNumber])


    return (<div className="chose-cards" >
        <form onSubmit={handelNextF} >
            <div className="chose-cards-titel"> {titel} : </div>
            <button className="X-btn" type="button" onClick={handelClose}>X</button>
            <div>
                {(edjsNumber[0] === 0 || edjsNumber[1] === 0 || edjsNumber[0] === -1) && (!INT.playerNotHaveSomeNum(playerID, 0)) ?
                    <label>
                        <input type="radio" name="firstCard" value="0" defaultChecked="true" onClick={handelChange} />
                        <img alt="0" src={require('../img/half/0.png')} />
                    </label>
                    : null
                }
                {(edjsNumber[0] === 1 || edjsNumber[1] === 1 || edjsNumber[0] === -1) && (!INT.playerNotHaveSomeNum(playerID, 1)) ?
                    <label>
                        <input type="radio" name="firstCard" value="1" defaultChecked="true" onClick={handelChange} />
                        <img alt="1" src={require('../img/half/1.png')} />

                    </label>
                    : null
                }
                {(edjsNumber[0] === 2 || edjsNumber[1] === 2 || edjsNumber[0] === -1) && (!INT.playerNotHaveSomeNum(playerID, 2)) ?
                    <label>
                        <input type="radio" name="firstCard" value="2" defaultChecked="true" onClick={handelChange} />
                        <img alt="2" src={require('../img/half/2.png')} />

                    </label>
                    : null
                }
                {(edjsNumber[0] === 3 || edjsNumber[1] === 3 || edjsNumber[0] === -1) && (!INT.playerNotHaveSomeNum(playerID, 3)) ?
                    <label>
                        <input type="radio" name="firstCard" value="3" defaultChecked="true" onClick={handelChange} />
                        <img alt="3" src={require('../img/half/3.png')} />

                    </label>
                    : null
                }
                {(edjsNumber[0] === 4 || edjsNumber[1] === 4 || edjsNumber[0] === -1) && (!INT.playerNotHaveSomeNum(playerID, 4)) ?
                    <label>
                        <input type="radio" name="firstCard" value="4" defaultChecked="true" onClick={handelChange} />
                        <img alt="4" src={require('../img/half/4.png')} />

                    </label>
                    : null
                }
                {(edjsNumber[0] === 5 || edjsNumber[1] === 5 || edjsNumber[0] === -1) && (!INT.playerNotHaveSomeNum(playerID, 5)) ?
                    <label>
                        <input type="radio" name="firstCard" value="5" defaultChecked="true" onClick={handelChange} />
                        <img alt="5" src={require('../img/half/5.png')} />

                    </label>
                    : null
                }
                {(edjsNumber[0] === 6 || edjsNumber[1] === 6 || edjsNumber[0] === -1) && (!INT.playerNotHaveSomeNum(playerID, 6))?
                    <label>
                        <input type="radio" name="firstCard" value="6" defaultChecked="true" onClick={handelChange} />
                        <img alt="6" src={require('../img/half/6.png')} />

                    </label>
                    : null
                }
            </div>


            <div className="second-number">
                {avilableNum[0] === 0 && (!INT.playerNotHaveSomeNum(playerID, 0))?
                    <label>
                        <input type="radio" name="secondCard" value="0" defaultChecked="true" />
                        <img alt="0" src={require('../img/half/0.png')} />
                    </label>
                    : null
                }


                {avilableNum[1] === 0 && (!INT.playerNotHaveSomeNum(playerID, 1))?
                    <label>
                        <input type="radio" name="secondCard" value="1" defaultChecked="true" />
                        <img alt="1" src={require('../img/half/1.png')} />
                    </label>
                    : null
                }



                {avilableNum[2] === 0 && (!INT.playerNotHaveSomeNum(playerID, 2))?
                    <label>
                        <input type="radio" name="secondCard" value="2" defaultChecked="true" />
                        <img alt="2" src={require('../img/half/2.png')} />
                    </label>
                    : null
                }



                {avilableNum[3] === 0 && (!INT.playerNotHaveSomeNum(playerID, 3))?
                    <label>
                        <input type="radio" name="secondCard" value="3" defaultChecked="true" />
                        <img alt="3" src={require('../img/half/3.png')} />
                    </label>
                    : null
                }



                {avilableNum[4] === 0 && (!INT.playerNotHaveSomeNum(playerID, 4))?
                    <label>
                        <input type="radio" name="secondCard" value="4" defaultChecked="true" />
                        <img alt="4" src={require('../img/half/4.png')} />
                    </label>
                    : null
                }



                {avilableNum[5] === 0 && (!INT.playerNotHaveSomeNum(playerID, 5))?
                    <label>
                        <input type="radio" name="secondCard" value="5" defaultChecked="true" />
                        <img alt="5" src={require('../img/half/5.png')} />
                    </label>
                    : null
                }




                {avilableNum[6] === 0 && (!INT.playerNotHaveSomeNum(playerID, 6))?
                    <label>
                        <input type="radio" name="secondCard" value="6" defaultChecked="true" />
                        <img alt="6" src={require('../img/half/6.png')} />
                    </label>
                    : null
                }



            </div>
            <button type="submit" className="chose-cards-next-btn" >Next</button>
        </form>
    </div>)
}

export default ChoseCardsDialog