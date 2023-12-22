import Image from 'next/image'
import styles from './page.module.css'
import { Search } from '@/components/search'
import Link from 'next/link'

export async function oraseFavorite(){
  try {
    const response  = await fetch("http://localhost:3000/api/getLastFiveFavourites")
    return  response.json()
  } catch (error) {
    console.error(error)
  }
}



export default async function Home() {
  const cinciOraseFavorite = await oraseFavorite()
  console.log(cinciOraseFavorite)
  return (
    <div>
       <Search/>
       <div className={styles.containerOraseFavorite}>
          <h1>Cinci orase favorite</h1>
          {cinciOraseFavorite.length > 0  && cinciOraseFavorite.map(oras => (
            <Link href={oras.name + '/' + oras.id}>{oras.country}/ {oras.admin1} / {oras.name}</Link>
          ))}
       </div>
       <div className={styles.containerOraseFavorite}> 
        <h1>Cinci orase random</h1>
            <Link href='/budapesta/3054643'>Budapesta</Link>
            <Link href='/milano/3173435'>Milano</Link>
            <Link href='/toronto/6167865'>Toronto</Link>
            <Link href='/timisoara/665087'>Timisoara</Link>
            <Link href='/brasov/683844'>Brasov</Link>
       </div>
    </div>
  )
}

