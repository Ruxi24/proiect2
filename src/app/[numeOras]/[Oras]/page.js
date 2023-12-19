'use client'
import Link from 'next/link';
import styles from './page.module.css';
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react';
 const Oras = () => {

    const [listaOrase, setListaOrase] = useState([]);
    const [orasulPaginii, setOrasulPaginii] = useState([])
    const [vremeaOras, setVremeaOras] = useState([])
    const [dezastreNaturale, setDezastreNaturale] = useState([])
    
    const params = useParams()
    const { numeOras, Oras } = params;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${numeOras}&count=10&language=en&format=json`);
                const data = await response.json();
                const orasulPaginii = await data.results.find((oras) => oras.id == Oras);
                setListaOrase(data);
                setOrasulPaginii(orasulPaginii)
                console.log(data)
                console.log(orasulPaginii)

                const vremea = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${orasulPaginii.latitude}&longitude=${orasulPaginii.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,rain,cloud_cover&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation_probability,rain,cloud_cover`)
                const vremeaData = await vremea.json()
                setVremeaOras(vremeaData)
                console.log(vremeaData)
                console.log(vremeaOras)

                const boundingBox = [
                    orasulPaginii.longitude - 1,  // min lon
                    orasulPaginii.latitude + 1,   // max lat
                    orasulPaginii.longitude + 1,  // max lon
                    orasulPaginii.latitude - 1,    // min lat
                  ];
                const nasaAPi = await fetch(`https://eonet.gsfc.nasa.gov/api/v3/events/geojson?bbox=${boundingBox.join(',')}`)
                const nasaAPiData = await nasaAPi.json();
                setDezastreNaturale(nasaAPiData)
                console.log(nasaAPiData)
                console.log(boundingBox.join(','))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (numeOras) {
            fetchData();
        }
    }, [numeOras]);

    
    if (!orasulPaginii) {
        return <div>Url gresit</div>;
    }
    if (orasulPaginii.length === 0 || vremeaOras.length === 0 || dezastreNaturale.length === 0) {
        return <div>loading...</div>;
    }
    return(
        <div>
            {decodeURI(Oras)}
            <p>{orasulPaginii.admin1}</p>
            <p>{orasulPaginii.name}</p>
            <p>{orasulPaginii.country}</p>
            <p>{orasulPaginii.population}</p>
            <p>{orasulPaginii.latitude}</p>
            <p>{orasulPaginii.longitude}</p>
            <p>{orasulPaginii.timezone}</p>
            <p>{orasulPaginii.elevation}</p>

            <h1>Vremea</h1>
            {vremeaOras.current.temperature_2m}

            <h1>Dezastre naturale recente</h1>
            {dezastreNaturale.features.map((dezastru, index) => (
                <div key={index} className={styles.dezastruNatural}>
                    <p>{dezastru.properties.title}</p>
                    <p>{dezastru.properties.date.substring(0, 10)}</p>
                </div>
            ))}
        </div>
    )
}

export default Oras;