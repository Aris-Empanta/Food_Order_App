import "../css/navBar.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { showProducts, showNavbar } from "../functions/navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons"

export const NavBar = () => {

    const [menu, setMenu] = useState([])

          
    // The menu routes are set depending the product categories we fetch
    //from the database.
    useEffect(() => {

        let navbar = document.getElementById("smallScreenNavbar")

        navbar.style.transform = "translateX(-100%)"

        axios.get("http://localhost:5000/products/categories").then((res) => {

            setMenu( res.data )
        })        
        
    }, [setMenu])

    //With that listener, when widow increases in width, the small screen navbar hides again
   window.addEventListener("resize", () => {

        const navBar = document.getElementById("smallScreenNavbar")

        if( window.innerWidth > 770 ) {
            navBar.style.transform = "translateX(-100%)"
        }           
    })
    

    return(<div>
             <ul id="topNavbar">
                <li id="navbarHome" className="largeScreenLinks">
                    <a href="#">Home</a>
                </li>
                <li className="largeScreenLinks">
                    <a href="#/chat">Live chat</a>
                </li>
                <li className="largeScreenLinks">
                    <a href="#">Contact</a>
                </li>
                <li className="smallScreenLinks">
                    <button href="#" onClick={ showNavbar } id="barsButton">
                        <FontAwesomeIcon icon={ faBars }  />
                    </button>
                </li>
                <li className="smallScreenLinks">
                    <a href="#">Home</a>
                </li>
                <li id="shoppingCart">
                    <a href="#/shopping-cart" >
                        <FontAwesomeIcon icon={ faShoppingCart }  />
                    </a>
                </li>                    
             </ul>
             <ul id="smallScreenNavbar">
                <li>
                    <a href="#/chat">Live Chat</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
             </ul>
             <ul id="menu"> 
                {menu.map( item => <li>
                                       <a href= { "#/" + item } onClick={() => showProducts(item)}>{ item }</a>
                                   </li>)}
             </ul>
          </div>)
}