import Link from "next/link";

export default function NavBar(){
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/"> 
                           Acasa  
                        </Link>
                        <Link href="/search">
                            Cauta
                        </Link> 
                        <Link href="/favourites">
                            Favorite
                        </Link>
                    </li>
                </ul>
            </nav>
            
        </div>
    )
    
}
