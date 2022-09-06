import "../css/shoppingCart.css"
import { socket } from "./chat"
import { useSelector, useDispatch } from "react-redux"
import { clearCart, addToCart, removeOneProduct } from "../redux/slice";
import { useEffect, useState } from "react";


export const ShoppingCart = () => {
    
    const [localCart, setLocalCart ] = useState([])
    
    //The apis to access and edit the cart state from redux toolkit store
    const cart = useSelector((state) => state.customer.cart)    
    const dispatch = useDispatch()

    useEffect(() => {
      
      // With the Map object and the array.map method, we keep only unique id values from the cart state
      const uniqueItems = [...new Map( cart.map(item => [item.id, item] )).values()]

      setLocalCart(uniqueItems)
    }, [])

    //The function to clear the entire local cart
    const clearLocalCart = () => {
      setLocalCart([])
    }

    const sendOrder = () => {

        socket.emit('send order', 'pizza')        
    }  

    return(<div className="shoppingCart">
                {localCart.map((item) => <div className="cartProducts">
                                            <img className="cartImage" src={item.image} />
                                            <p>{ item.name }</p>
                                            <div>
                                              <button onClick = { () => dispatch(addToCart(item)) }>Increase</button>
                                              <p>Quantity : { cart.filter( value => value.id === item.id).length} </p>
                                              <button onClick = { () => dispatch(removeOneProduct()) }>Decrease</button>
                                            </div>
                                         </div>                      )}
                <button onClick={ sendOrder }>send order</button>
                <button onClick={ () => {dispatch(clearCart());clearLocalCart()} }>Clear cart</button>
           </div>)
}