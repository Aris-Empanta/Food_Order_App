import { useEffect } from "react"
import "../css/shoppingCart.css"
import { socket } from "./chat"

export const ShoppingCart = () => {

    const sendOrder = () => {

        socket.emit('send order', 'pizza')
    }

    return(<div className="shoppingCart">
                <button onClick={ sendOrder }>send order</button>
           </div>)
}