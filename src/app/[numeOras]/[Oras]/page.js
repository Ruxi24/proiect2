'use client'
import Link from 'next/link';
import styles from './page.module.css';
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { FaExclamation, FaCloud, FaCloudRain, FaThermometerThreeQuarters } from "react-icons/fa";
import { TbDropletHalfFilled } from "react-icons/tb";
import { WiCloudyGusts } from "react-icons/wi";
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
                const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${numeOras}&count=10&language=ro&format=json`);
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

    const addPost = async (nume, id, admin1, country) => {
        try {
          const response = await fetch('/api/postCity', {
             method: 'POST',
             headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: nume,
              id: id,
              admin1: admin1,
              country: country,
            }),
         }); 
         console.log('1')
        } catch (error) {
          console.error('Error adding post:', error);
        }
      };

        const deletePost = async(id) => {
            try {
                const response = await fetch('/api/deleteCity', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id
                }),
            }); 
            } catch (error) {
                console.error('Error adding post:', error);
            }
        }

    
    if (!orasulPaginii) {
        return <div>Url gresit</div>;
    }
    if (orasulPaginii.length === 0 || vremeaOras.length === 0 || dezastreNaturale.length === 0) {
        return <div>loading...</div>;
    }
    const minToday = vremeaOras.hourly.temperature_2m.slice(0, 24).reduce((min, ora) => {
        return ora < min ? ora : min;
    }, Number.POSITIVE_INFINITY);
    const maxToday = vremeaOras.hourly.temperature_2m.slice(0, 24).reduce((min, ora) => {
        return ora > min ? ora : min;
    }, Number.NEGATIVE_INFINITY);
    const minTomorrow = vremeaOras.hourly.temperature_2m.slice(24, 48).reduce((min, ora) => {
        return ora < min ? ora : min;
    }, Number.POSITIVE_INFINITY);
    const maxTomorrow = vremeaOras.hourly.temperature_2m.slice(24, 48).reduce((min, ora) => {
        return ora > min ? ora : min;
    }, Number.NEGATIVE_INFINITY);
    return(
        <div className={styles.containerOras}>
            <div className={styles.innerDiv}>
                <h1>{orasulPaginii.name}</h1>
                <div className={styles.informatiiGenerale}>
                    <p>Regiune administrativa: {orasulPaginii.admin1}</p>
                    <p>Tara: {orasulPaginii.country}</p>
                    <p>Populatie: {orasulPaginii.population} de oameni</p>
                    <p>Fus orar: {orasulPaginii.timezone}</p>
                    <p>Altitudine: {orasulPaginii.elevation} metrii deasupra nivelului marii</p>
                    <button onClick={() => addPost(orasulPaginii.name, Oras, orasulPaginii.admin1, orasulPaginii.country)} className={styles.button}>Salveaza la favorite</button>
                    <button onClick={() => deletePost(Oras)} className={styles.button}>Sterge de la favorite </button>
                </div>

                <div className={styles.containerComponentGrid2}>
                    <h1>Prognoza de azi in {decodeURI(numeOras)}</h1>
                    <div className={styles.prognozaDeAstaziGrid}>
                        <div className={styles.containerCasutaGrid}>
                            <p>Temperatura actuala</p>
                            <p>{vremeaOras.current.temperature_2m}{vremeaOras.current_units.temperature_2m}</p>
                        </div>
                        <div className={styles.containerCasutaGrid}>
                            <p>Temperatura in dimineata asta</p>
                            <p>{vremeaOras.hourly.temperature_2m[8]}{vremeaOras.hourly_units.temperature_2m}</p>
                        </div>
                        <div className={styles.containerCasutaGrid}>
                            <p>Temperatura in aceasta amiaza</p>
                            <p>{vremeaOras.hourly.temperature_2m[12]}{vremeaOras.hourly_units.temperature_2m}</p>
                        </div>
                        <div className={styles.containerCasutaGrid}>
                            <p>Temperatura in aceasta seara</p>
                            <p>{vremeaOras.hourly.temperature_2m[20]}{vremeaOras.hourly_units.temperature_2m}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.containerComponentGrid}>
                    <h1>Vremea de astazi in {decodeURI(numeOras)}</h1>
                    <div className={styles.vremeaDeAstaziGrid}>
                        <div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><FaExclamation /></div>
                                <p>Min/Max</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{minToday}{vremeaOras.hourly_units.temperature_2m} / {maxToday}{vremeaOras.hourly_units.temperature_2m}</div>
                        </div>
                        <div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><FaCloud /></div>
                                <p>acoperirea noroasă</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.current.cloud_cover}{vremeaOras.current_units.cloud_cover} </div>
                        </div><div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><TbDropletHalfFilled /></div>
                                <p>Umiditate</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.current.relative_humidity_2m}{vremeaOras.current_units.relative_humidity_2m}</div>
                        </div><div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><WiCloudyGusts /></div>
                                <p>Viteza vantului</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.current.wind_speed_10m}{vremeaOras.current_units.wind_speed_10m}</div>
                        </div><div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><FaCloudRain /></div>
                                <p>Precipitatii</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.current.rain}{vremeaOras.current_units.rain}</div>
                        </div><div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><FaThermometerThreeQuarters /></div>
                                <p>Temperatura resimtita:</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.current.apparent_temperature}{vremeaOras.current_units.apparent_temperature}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.containerComponentGrid}>
                    <h1>Vremea de maine in {decodeURI(numeOras)}</h1>
                    <div className={styles.vremeaDeAstaziGrid}>
                        <div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><FaExclamation /></div>
                                <p>Min/Max</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{minTomorrow}{vremeaOras.hourly_units.temperature_2m} / {maxTomorrow}{vremeaOras.hourly_units.temperature_2m}</div>
                        </div>
                        <div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><FaCloud /></div>
                                <p>acoperirea noroasă</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.hourly.cloud_cover[12]}{vremeaOras.current_units.cloud_cover} </div>
                        </div><div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><TbDropletHalfFilled /></div>
                                <p>Umiditate</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.hourly.relative_humidity_2m[12]}{vremeaOras.current_units.relative_humidity_2m}</div>
                        </div><div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><WiCloudyGusts /></div>
                                <p>Viteza vantului</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.hourly.wind_speed_10m[12]}{vremeaOras.current_units.wind_speed_10m}</div>
                        </div><div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><FaCloudRain /></div>
                                <p>Precipitatii</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.hourly.rain[12]}{vremeaOras.current_units.rain}</div>
                        </div><div className={styles.containerCasutaGrid}>
                            <div className={styles.containerCasutaScris}>
                                <div className={styles.containerIcon}><FaThermometerThreeQuarters /></div>
                                <p>Temperatura resimtita:</p>
                            </div>
                            <div className={styles.containerScrisDreapta}>{vremeaOras.hourly.apparent_temperature[12]}{vremeaOras.current_units.apparent_temperature}</div>
                        </div>
                    </div>
                </div>

                <div>
                    {dezastreNaturale.features.length === 0 ?
                    <div>
                        <p>Nu a avut loc nici un dezastru natural in ultima vreme</p>
                    </div> 
                    : <div className={styles.containerDezastreNaturale}>
                        <h1>Dezastre naturale recente</h1>
                        <div className={styles.dezastruNaturalGrid}>
                            {dezastreNaturale.features.map((dezastru, index) => (
                                <div key={index} className={styles.dezastruNatural}>
                                    <p>{dezastru.properties.title}</p>
                                    <p className={styles.containerScrisDreapta}>{dezastru.properties.date.substring(0, 10)}</p>
                                </div>
                            ))}
                        </div>
                     </div>}
                </div>
            </div>
        </div>
    )
}

export default Oras;