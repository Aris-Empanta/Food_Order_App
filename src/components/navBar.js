import "../css/navBar.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { showProducts } from "../functions/navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons"

export const NavBar = () => {

    const [menu, setMenu] = useState([])
          
    // The menu routes are set depending the product categories we fetch
    //from the database.
    useEffect(() => {

        axios.get("http://localhost:5000/products/categories").then((res) => {

            setMenu( res.data )
        })        
        
    }, [setMenu])
    

    return(<div>
             <ul id="topNavbar">
                <li id="navbarHome" className="largeScreenLinks">
                    <a href="#">Home</a>
                </li>
                <li className="largeScreenLinks">
                    <a href="#/chat">Live chat</a>
                </li>
                <li className="smallScreenLinks">
                    <a href="#">
                        <FontAwesomeIcon icon={ faBars }  />
                    </a>
                </li>
                <li className="smallScreenLinks">
                    <a href="#">Home</a>
                </li>
                <li id="shoppingCart" className="navbarFonts">
                    <a href="#/shopping-cart" >
                        <FontAwesomeIcon icon={ faShoppingCart }  />
                    </a>
                </li>                    
             </ul>
             <ul id="menu"> 
                {menu.map( item => <li>
                                       <a href= { "#/" + item } onClick={() => showProducts(item)}>{ item }</a>
                                   </li>)}
             </ul>
          </div>)
}