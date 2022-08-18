import "../css/navBar.css"
import axios from "axios"
import { useEffect, useState } from "react"

export const NavBar = () => {

    const [menu, setMenu] = useState([])

    useEffect(() => {

        axios.get("http://localhost:5000/products/categories").then((res) => {

            setMenu( res.data )
        })        
    }, [setMenu])

    const pageRefresh = () => {
        setTimeout(() => window.location.reload(), 1)
    }

    return(<div>
                <ul id="menu">
                    {menu.map( item => <li>
                                         <a href= { "#/" + item } onClick={pageRefresh}>{ item }</a>
                                       </li>)}
                </ul>
          </div>)
}