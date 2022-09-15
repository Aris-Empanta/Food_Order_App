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
import { saveCustomerInfo, generateCode, getFinalCart } from '../functions/customerInfo';
import axios from 'axios';
import { socket } from "./chat"

export const CustomerInfo = () => {

    const dispatch = useDispatch()    
    const navigate = useNavigate()    
    const cart = useSelector( state => state.customer.finalCart )

    useEffect ( () => {     

      //The component should not be accesible except we submit for purchase
      return () => {
        dispatch(submitCart(false))
      }   

    })



    // We send a verification code to the customer and 
    //store it in the redux store.
    const getPassword = (e) => {

      e.preventDefault()
      
      let name = document.getElementById("enterName").value
      let mail =  document.getElementById("enterEmail").value
      let saveInfoPermission = document.getElementById("saveInfoPermission").checked      
      
      //A random 6 figure number for e-mail verification
      let verificationCode = generateCode()
      
      //The final cart details to be sent
      let finalCart = getFinalCart(cart)

      //We save the code and email to the redux store                       
      dispatch(setVerificationCode(verificationCode))
      dispatch(setEmail(mail))
      dispatch(setCustomerName(name))
      dispatch(setFinalCart(finalCart))
      //Receiving access to the component we will redirect
      dispatch(verifyPurchase(true))
      //Redirect to the next component
      navigate("./confirm-purchase", { replace: true} )

      //Sending http request to the server to send the verification code to the customer
      axios.post("http://localhost:5000/confirm-email", { mail: mail,
                                                          verificationCode: verificationCode
                                                        })
      //We save customer's info only if customer agrees          
      if ( saveInfoPermission === true ) saveCustomerInfo(socket)

    }

        return(<div className='customerInfoSection'>
                  <div className = "customerInfo" >
                    <h2>Delivery details</h2>
                    <form id='customerForm'>
                      <label>Name/Doorbell</label>
                      <input type="text" id="enterName"/>
                      <label>address</label>
                      <input type="text" id="enterAddress" />
                      <label>floor</label>
                      <input type="text" id="enterFloor" /> 
                      <label>mobile phone</label>
                      <input type="number" id="enterPhone" />
                      <label>email</label>
                      <input type="email" id="enterEmail" />
                      <label>Additional comments</label>
                      <textarea type="text" id="enterComments" />
                      <div id="rememberMe">
                        <input type="checkbox" id="saveInfoPermission"/>
                        <p> Remember me </p>
                      </div>
                      <button onClick={ getPassword }>submit</button>
                    </form> 
                  </div>
                  <div>
                    <h2>Already a customer? Please just enter your email</h2>
                    <label>email</label><br />
                    <input type="email"/><br />
                    <label>Additional comments</label><br />
                    <textarea type="text" id="enterComments" /><br />
                    <button> Submit </button>
                  </div>
               </div>)
    
}