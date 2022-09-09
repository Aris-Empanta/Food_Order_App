import "../css/shoppingCart.css"
import { socket } from "./chat"
import { useSelector, useDispatch } from "react-redux"
import { clearCart, 
         addToCart, 
         decreaseByOne, 
         removeProduct,
         submitCart } from "../redux/slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ShoppingCart = () => {
    
    const [localCart, setLocalCart ] = useState([])
    
    //The apis to access and edit the cart state from redux toolkit store
    const cart = useSelector((state) => state.customer.cart)   
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      
      // With the Map object and the array.map method, we keep only unique id values from the cart state
      const uniqueItems = [...new Map( cart.map(item => [item.id, item] )).values()]
      //The local cart without duplicates
      setLocalCart(uniqueItems)
    }, [])

    //The function to delete the shopping cart
    const clearLocalCart = () => {

      //Emptying the local cart
      setLocalCart([])
      //Deleting the global redux cart
      dispatch(clearCart())
    }     

    // Below value will decrease the quantity of one product by
    //1, with minimum quantity amout to be 1.
    const decreaseQuantity = (id) => {

      let quantity = document.getElementById(id + " quantity").innerText

      if(quantity > 1) dispatch(decreaseByOne(id))      
    }

    //Below function removes a whole item from the cart
    const removeItem = (id) => {

      let newLocalCart = localCart.filter(item => item.id !== id)
      //Updating local cart
      setLocalCart(newLocalCart)
      //Updating redux global cart
      dispatch(removeProduct(id))
    }
    
    //The function to send the cart order to the server in real time.
    const sendOrder = () => {

      dispatch(submitCart())
      //Redirect to the next component
      navigate("./customer-info", { replace: true} )       
  } 

    return(<div className="shoppingCart">
                {localCart.map((item) => <div className="cartProducts">
                                            <img className="cartImage" src={item.image} />
                                            <p>{ item.name }</p>
                                            <div>
                                              <button onClick = { () => dispatch(addToCart(item)) }>Increase</button>
                                              <p>Quantity : <span id={ item.id + " quantity"}>
                                                                { cart.filter( value => value.id === item.id).length}
                                                            </span>
                                              </p>
                                              <button onClick = { () => decreaseQuantity(item.id) }>Decrease</button>
                                            </div>
                                            <button onClick = { () => removeItem(item.id)}>Delete</button>
                                         </div>                      )}
                <button onClick={ sendOrder }>send order</button>
                <button onClick={ clearLocalCart } >Clear cart</button>                
           </div>)
}