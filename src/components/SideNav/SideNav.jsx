import React, { useEffect, useState } from 'react'
import './SideNav.css'
import axios from "axios"

const SideNav = () => {
    const [jokes, setJokes] = useState([])
    const endPoint = "https://api.api-ninjas.com/v1/jokes?limit=5"

    const getJokes = async () => {
        const res = await axios.get(endPoint, {
            headers: {
                "X-Api-Key": "i7jthkOQNIOuw8vLu5Lsiw==kD7e1Dk4iTBAZsb4"
            }
        })
        setJokes(res.data)
    }
    useEffect(() => {
        getJokes()
    }, [])
    return (
        <div className='sideNav_container'>
            <div className="sideNavHeading">
                <h2>Daily Jokes</h2>
            </div>
            <ul className="jokes">
                {jokes && jokes.map((data, idx) => <li key={idx}>{data.joke}</li>)}
            </ul>
        </div>
    )
}

export default SideNav