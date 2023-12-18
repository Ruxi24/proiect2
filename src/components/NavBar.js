import Link from "next/link";

export default function NavBar(){
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link legacyBehavior href="proiect2/src/app/page.js"> 
                            <a>Home</a>  
                        </Link>
                        <Link legacyBehavior href="proiect2/src/app/search/page.js">
                            <a>Cauta</a>
                        </Link> 
                        <Link legacyBehavior href="proiect2/src/app/favourites/page.js">
                            <a>Favorite</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            
        </div>
    )
    
}
