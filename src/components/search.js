'use client'
import styles from "../components/search.module.css"

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
        <div className={styles.containerSearch}>
            <input type="text"
             placeholder="Cauta un oras..."
             onKeyDown={EnterPress}
             onChange={(e) => setCity(e.target.value)}/>
            <button onClick={GoToCitiesPage}>search</button>
        </div>
    )
}