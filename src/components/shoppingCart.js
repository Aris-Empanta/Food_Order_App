import "../css/shoppingCart.css"
import { useSelector, useDispatch } from "react-redux"
import { clearCart, 
         addToCart, 
         decreaseByOne, 
         removeProduct,
         setFinalCart,
         submitCart } from "../redux/slice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
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

      dispatch(submitCart(true))
      //Redirect to the next component
      navigate("./customer-info", { replace: true} )    

      
      let finalCart = localCart.map( item => {
                                                const modifiedCart = {}
                                                
                                                modifiedCart["id"] = item.id
                                                modifiedCart["name"] = item.name                                                
                                                modifiedCart["image"] = item.image
                                                modifiedCart["checkedStatus"] = "unChecked"
                                                modifiedCart["quantity"] = cart.filter( value => value.id === item.id).length
                                                modifiedCart["unitPrice"] = item.price 
                                                modifiedCart["price"] = item.price * modifiedCart["quantity"]                                          

                                                return modifiedCart
                                              })
      dispatch(setFinalCart(finalCart)) 
  } 

    return(<div className="shoppingCart">
              <div className="cartDetails">
                {localCart.map((item) => <div className="cartProducts">
                                            <img className="cartImage" src={item.image} />
                                            <div className="nameAndDescription">
                                              <p>{ item.name }</p>
                                              <p>{item.description}</p>
                                            </div>
                                            <div className="controlQuantity" >
                                              <button onClick = { () => dispatch(addToCart(item)) } 
                                                      className="cartButtons" >
                                                <FontAwesomeIcon icon={ faPlus } />
                                              </button>
                                              <div className="quantityBox">
                                                <p id={ item.id + " quantity"}>
                                                  { cart.filter( value => value.id === item.id).length}
                                                </p> 
                                              </div>                                             
                                              <button onClick = { () => decreaseQuantity(item.id) }
                                                      className="cartButtons" >
                                                <FontAwesomeIcon icon={ faMinus } />
                                              </button>
                                            </div>
                                            <button onClick = { () => removeItem(item.id)}
                                                    className="cartButtons" >
                                              <FontAwesomeIcon icon={ faTrash } />
                                            </button>
                                         </div>                      )}
                </div>                          
                <div className="summarizeCart">

                  <button onClick={ sendOrder }>send order</button>
                  <button onClick={ clearLocalCart } >Clear cart</button>
                </div>               
           </div>)
}