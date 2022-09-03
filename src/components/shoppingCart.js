import "../css/shoppingCart.css"
import { socket } from "./chat"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

export const ShoppingCart = () => {

    

    const cart = useSelector((state) => state.cart.value)
    const dispatch = useDispatch()

    useEffect(() => console.log(cart))

    const sendOrder = () => {

        socket.emit('send order', 'pizza')
    }

    return(<div className="shoppingCart">
                {cart.map(item => <p>{ item }</p>)}
                <button onClick={ sendOrder }>send order</button>
           </div>)
}