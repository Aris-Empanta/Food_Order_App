import React from 'react';
import "../css/customerInfo.css"
import { useDispatch, useSelector } from "react-redux"
import { setVerificationCode, 
         submitCart,
         setCustomerName, 
         setEmail,
         verifyPurchase, 
         setFinalCart} from '../redux/slice';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const CustomerInfo = () => {

    const dispatch = useDispatch()    
    const navigate = useNavigate()    
    const cart = useSelector( state => state.customer.finalCart )

    useEffect ( () => {     

      //The component should not be accesible except we submit for purchase
      return () => {
        dispatch(submitCart())
      }   

    })

    // We send a verification code to the customer and 
    //store it in the redux store.
    const getPassword = () => {

      let name = document.getElementById("enterName").value
      let mail =  document.getElementById("enterEmail").value

      //We add customer's name to the finalCart
      let finalCart = cart.map( item => {
                                          const modifiedCart = {}

                                          modifiedCart["customerName"] = name
                                          modifiedCart["id"] = item.id
                                          modifiedCart["name"] = item.name                                                
                                          modifiedCart["image"] = item.image
                                          modifiedCart["quantity"] = item.quantity
                                          modifiedCart["price"] = item.price * modifiedCart["quantity"]

                                          return modifiedCart
                                        })
      
      //A random 6 figure number
      let verificationCode = 100000 * Math.floor(Math.random() * 10) +
                             10000 * Math.floor(Math.random() * 10) +
                             1000 * Math.floor(Math.random() * 10) + 
                             100 * Math.floor(Math.random() * 10) + 
                             10 * Math.floor(Math.random() * 10) + 
                             Math.floor(Math.random() * 10)
      //We save the code and email to the redux store                       
      dispatch(setVerificationCode(verificationCode))
      dispatch(setEmail(mail))
      dispatch(setCustomerName(name))
      dispatch(setFinalCart(finalCart))
      //Receiving access to the component we will redirect
      dispatch(verifyPurchase())
      //Redirect to the next component
      navigate("./confirm-purchase", { replace: true} )

      axios.post("http://localhost:5000/confirm-email", { mail: mail,
                                                          verificationCode: verificationCode
                                                        })

    }

        return(<div className = "custommerInfo" >
                  <form>
                    <label>Enter your name</label>
                    <input type="name" id="enterName"></input>
                    <label>Enter your email</label>
                    <input type="email" id="enterEmail"></input>
                    <button onClick={ getPassword }>submit</button>
                  </form>
               </div>)
    
}