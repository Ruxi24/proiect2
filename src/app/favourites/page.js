import Link from "next/link";
import styles from './page.module.css';

export async function fetchData(){
    const oraseFavorite = await fetch("http://localhost:3000/api/getFavouriteCities",{
          cache: 'no-cache'
      })
  
      return oraseFavorite.json();
  }


export default async function favourites(){
    const oraseFavorite = await fetchData();
    return(
        <div>
            <h1>Favorite</h1>
            <br/>
            {oraseFavorite.map(oras => (
                <div key={oras._id} className={styles.oras}>
                    <Link href={oras.name + '/' + oras.id}>{oras.country}/ {oras.admin1} / {oras.name}</Link>
                </div>
            ))}
        </div>
    )
}