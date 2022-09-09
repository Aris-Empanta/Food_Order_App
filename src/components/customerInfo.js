import React from 'react';
import "../css/customerInfo.css"
import { useDispatch, useSelector } from "react-redux"
import { setVerificationCode, 
         submitCart, 
         verifyPurchase } from '../redux/slice';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const CustomerInfo = () => {

    const dispatch = useDispatch()    
    const navigate = useNavigate()
    const code = useSelector( state => state.customer.verificationCode)

    useEffect ( () => {      

      console.log(code)

      //The component should not be accesible except we submit for purchase
      return () => {
        dispatch(submitCart())
      }   

    })

    // We send a verification code to the customer and 
    //store it in the redux store.
    const getPassword = () => {

      let enterEmail =  document.getElementById("enterEmail").value
      //A random 6 figure number
      let verificationCode = 100000 * Math.floor(Math.random() * 10) +
                             10000 * Math.floor(Math.random() * 10) +
                             1000 * Math.floor(Math.random() * 10) + 
                             100 * Math.floor(Math.random() * 10) + 
                             10 * Math.floor(Math.random() * 10) + 
                             Math.floor(Math.random() * 10)
      //We save it to the redux store                       
      dispatch(setVerificationCode(verificationCode))
      //Receiving access to the component we will redirect
      dispatch(verifyPurchase())
      //Redirect to the next component
      navigate("./confirm-purchase", { replace: true} )

      axios.post("http://localhost:5000/confirm-email", { mail: enterEmail,
                                                          verificationCode: verificationCode
                                                        })

    }

        return(<div className = "custommerInfo" >
                  <form>
                    <label>Enter your email</label>
                    <input type="email" id="enterEmail"></input>
                    <button onClick={ getPassword }>submit</button>
                  </form>
               </div>)
    
}