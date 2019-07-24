import React from 'react'



const EmptyCards = ({ cards }) => {

    return (
        <div className="empty-cards">
            {cards.map(e =>
                e.id === 28 ?
                    <img
                        className="HImg"
                        alt="Empty Card" key={e.first} src={require('../img/empty.png')} />
                    :
                    <img
                        className="HImg"
                        alt="Empty Card" key={e.id} src={require(`../img/${e.first}-${e.second}.png`)} />)
            }
        </div>
    )
}


export default EmptyCards