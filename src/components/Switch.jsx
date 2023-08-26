import React from 'react'
import ReactSwitch from "react-switch"
import { useContext } from 'react'
import { ThemeContext } from '../Contexts/ThemeContext'

const Switch = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <div>
        <div className='switch'>
          <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
    </div>
  )
}

export default Switch