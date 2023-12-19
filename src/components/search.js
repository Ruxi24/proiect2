'use client'

import { useState } from "react";

export const Search = () => {
    const [city, setCity] = useState('')
    const GoToCitiesPage = () => {
        window.location.href = `/${city}`
    }

    const EnterPress = (event) => {
        if (event.key === 'Enter') {
            GoToCitiesPage()
        }
      };
    return(
        <div>
            <input type="text"
             onKeyDown={EnterPress}
             onChange={(e) => setCity(e.target.value)}/>
            <button>search</button>
        </div>
    )
}