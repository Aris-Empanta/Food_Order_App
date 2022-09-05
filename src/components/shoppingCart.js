import "../css/shoppingCart.css"
import { socket } from "./chat"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../redux/slice";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShoppingCart = () => {
    
    const [localCart, setLocalCart ] = useState([])
    
    //The apis to access and edit the cart state from redux toolkit store
    const cart = useSelector((state) => state.cart.value)    
    const dispatch = useDispatch()

    useEffect(() => {
      
      // With the Map object and the array.map method, we keep only unique id values from the cart state
      const uniqueItems = [...new Map( cart.map(item => [item.id, item] )).values()]

      setLocalCart(uniqueItems)
    }, [])

    const sendOrder = () => {

        socket.emit('send order', 'pizza')        
    }

    

    return(<div className="shoppingCart">
                {localCart.map((item) => <div>
                                            <p>{ item.name }</p>
                                            <p>Quantity : { cart.filter( value => value.id === item.id).length} </p>
                                         </div>                      )}
                <button onClick={ sendOrder }>send order</button>
                <button onClick={ () => dispatch(clearCart()) }>Clear cart</button>
           </div>)
}