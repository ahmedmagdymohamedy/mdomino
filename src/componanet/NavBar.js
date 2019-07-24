import React from 'react'
import { Link } from '@reach/router'

export default () => {
    return(
        <div className="navbar">
            <div className="meddil row-1200 navbar-containi">
                <div className="labal"> M Domino </div>
                <div className="float-right">
                    <li>
                        <Link to="/">Home</Link>
                        <Link to="about">About</Link>
                        <a href="https://www.facebook.com/profile.php?id=100005921196180" target="_blank">FaceBook</a>
                    </li>
                </div>
            </div>
        </div>
    )
}