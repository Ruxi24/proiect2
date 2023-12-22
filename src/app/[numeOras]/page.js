'use client'
import Link from 'next/link';
import styles from './page.module.css';
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react';
const NumeOras = () => {
    const [searchResults, setSearchResults] = useState([]);
    const params = useParams()
    const { numeOras } = params;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${numeOras}&count=10&language=ro&format=json`);
                const data = await response.json();
                setSearchResults(data);
                console.log(data.results)
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (numeOras) {
            fetchData();
        }
    }, [numeOras]);
    if (!searchResults || searchResults.length === 0 ) {
        return <div>loading...</div>;
    }
    return (
        <div className={styles.Container}>
            <h1>{decodeURI(numeOras)}</h1>
            <br/>
            <div className={styles.ToateOrasele}>
                {searchResults.results == undefined ? <div>Orasul nu a fost gasit</div>
                 : searchResults.results.map((oras, index) => (
                    <Link href={'/' + numeOras + '/' + oras.id} key={index}>
                        {oras.name}, {oras.admin1}, {oras.country}

                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NumeOras;
