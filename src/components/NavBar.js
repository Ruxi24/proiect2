import Link from "next/link";
import styles from "../components/NavBar.module.css"

export default function NavBar(){
    return(
        <div className={styles.containerNavBar}>
            <Link href="/"> 
               Acasa  
            </Link>
            <Link href="/favourites">
                Favorite
            </Link>   
        </div>
    )
    
}
