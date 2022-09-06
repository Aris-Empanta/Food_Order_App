import "../css/navBar.css"
import axios from "axios"
import { useEffect, useState } from "react"

export const NavBar = () => {

    const [menu, setMenu] = useState([])
          
    // The menu routes are set depending the product categories we fetch
    //from the database.
    useEffect(() => {

        axios.get("http://localhost:5000/products/categories").then((res) => {

            setMenu( res.data )
        })        
        
    }, [setMenu])

    // Below function shows only products with the same category name as the
    //url parameter, and hides the rest, once we click a certain route.
    const showProducts = (category) => {

        const obviousProducts = document.getElementsByClassName(category) 
        const allProducts = document.getElementsByClassName('product')

        //Hides all products
        for( let i=0; i < allProducts.length; i++) {

            allProducts[i].style.display = 'none'
        }

        //Show only the desirable ones
        for( let i=0; i < obviousProducts.length; i++) {

            obviousProducts[i].style.display = 'initial'
        }
    }

    return(<div>
                <ul id="menu">
                    {menu.map( item => <li>
                                         <a href= { "#/" + item } onClick={() => showProducts(item)}>{ item }</a>
                                       </li>)}
                    <li><a href="#/chat">Live chat</a></li>
                    <li><a href="#/shopping-cart">Shopping cart</a></li>
                </ul>
          </div>)
}