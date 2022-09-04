import "../css/shoppingCart.css"
import { socket } from "./chat"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../redux/slice";
import { useEffect } from "react";

export const ShoppingCart = () => {

    
    //The apis to access and edit the cart state from redux toolkit store
    const cart = useSelector((state) => state.cart.value)    
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(cart)
    })

    const sendOrder = () => {

        socket.emit('send order', 'pizza')
    }

    

    return(<div className="shoppingCart">
                {cart.map(item => <div className="cartItem">
                                      <img className="cartImage" src={item.image} />
                                      <p>{ item.name }</p>
                                      <p>Quantity: </p>
                                  </div>)}
                <button onClick={ sendOrder }>send order</button>
                <button onClick={ () => dispatch(clearCart()) }>Clear cart</button>
           </div>)
}