import React from 'react'

export const HalfCards = ({ notHaveCards }) => {

    return (
        <div style={{ paddingTop: "20px" }}>
            {notHaveCards.map((e, i) => (
                e === 1 ?
                        <img
                            className="HImg"
                            style={{
                                filter: "opacity(30%)",
                                backgroundColor : "transparent"
                            }}
                            alt={`${i} Card`} key={i} src={require(`../img/half/${i}.png`)} >
                        </img>
                    :
                    null
            ))

            }
        </div>
    )
}

export default HalfCards