import "../css/navBar.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { showProducts, handeAppLoading,
         handleNavbar } from "../functions/navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux'
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import logo from "../css/images/logo.png"
import { serverHost } from "../variables/variables"
import useStateWithCallback from 'use-state-with-callback';

export const NavBar = () => {

    const [menu, setMenu] = useStateWithCallback([], handeAppLoading)

    const cart = useSelector( state => state.customer.cart )
          
    // The menu routes are set depending the product categories we fetch
    //from the database.
    useEffect(() => {

        
        let navbar = document.getElementById("smallScreenNavbar")
        let xMark = document.getElementById("xMarkIcon")

        navbar.style.transform = "translateX(-100%)"
        xMark.style.display = "none"


        axios.get( serverHost + "products/categories").then((res) => {

            setMenu( res.data )
        })        
        
    }, [setMenu])

    //With that listener, when widow increases in width, the small screen navbar hides again
   window.addEventListener("resize", () => {

        const navBar = document.getElementById("smallScreenNavbar")
        let barsIcon = document.getElementById("barsIcon")
        let xMark = document.getElementById("xMarkIcon")

        if( window.innerWidth > 770 ) {
            navBar.style.transform = "translateX(-100%)"
            xMark.style.display = "none"
            barsIcon.style.display = "initial"
        }           
    })
    

    return(<div id="navbarWrapper">
             <ul id="topNavbar">
                <li id="navbarHome" className="largeScreenLinks">
                    <a href="#" className="logoLink">                        
                        <img src={ logo } className="logo"/>
                        <div>
                           <p className="restaurantName">Aris</p>
                           <p className="restaurantName">Snack Bar</p>
                        </div>                        
                    </a>
                </li>
                <li className="largeScreenLinks">
                    <a href="#/chat">Live chat</a>
                </li>
                <li className="largeScreenLinks">
                    <a href="#/contact" >Contact</a>
                </li>
                <li className="smallScreenLinks">
                    <button href="#" onClick={ handleNavbar } id="barsButton">
                        <FontAwesomeIcon icon={ faBars } id="barsIcon" />
                        <FontAwesomeIcon icon={ faXmark } id="xMarkIcon" />
                    </button>
                </li>
                <li className="smallScreenLinks">
                    <a href="#" className="logoLink">                        
                        <div id="smallLogo">
                           <p className="restaurantName">Aris</p>
                           <p className="restaurantName">Snack Bar</p>
                        </div>                      
                    </a>
                </li>
                <li id="shoppingCart">
                    <a href="#/shopping-cart" id="cartIcon" >
                        <FontAwesomeIcon icon={ faShoppingCart }  />  
                        <div id="cartAmountWrapper">
                            <p id="cartAmount" >{ cart.length }</p>
                        </div>                      
                    </a>                    
                </li>                    
             </ul>
             <ul id="smallScreenNavbar">
                <li>
                    <a href="#/chat" onClick={ handleNavbar }>Live Chat</a>
                </li>
                <li>
                    <a href="#/contact" onClick={ handleNavbar } >Contact</a>
                </li>
             </ul>
             <ul id="menu"> 
                {menu.map( item => <li className="individualProduct">
                                       <a href= { "#/" + item } onClick={() => showProducts(item)}>{ item }</a> 
                                   </li>)}
             </ul>
          </div>)
}