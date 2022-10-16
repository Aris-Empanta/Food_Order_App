import React from 'react';
import "../css/customerInfo.css"
import { useDispatch, useSelector } from "react-redux"
import { setVerificationCode, 
         submitCart,
         setCustomerName, 
         setEmail,
         setComments,
         verifyPurchase, 
         checkCustomerRegistered,
         setFinalCart} from '../redux/slice';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { saveCustomerInfo, generateCode, getFinalCart } from '../functions/cartFunctions';
import axios from 'axios';
import { socket } from "./chat"

export const CustomerInfo = () => {

    const dispatch = useDispatch()    
    const navigate = useNavigate()    
    const cart = useSelector( state => state.customer.finalCart )

    useEffect(() => console.log(cart))
       
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
      //We save the info that the customer is not registered
      dispatch(checkCustomerRegistered(false))
      //Receiving access to the component we will redirect
      dispatch(verifyPurchase(true))
      //Redirect to the next component
      navigate("./confirm-purchase", { replace: true} )

      //Sending http request to the server to send the verification code to the customer
      axios.post("http://localhost:5000/confirm-email", { mail: mail,
                                                          verificationCode: verificationCode })
      //We save customer's info only if customer agrees          
      if ( saveInfoPermission === true ) saveCustomerInfo(socket)
    }

    //The function to fetch data of registered customer
    const handleRegisteredCustomer = () => {

      let mail =  document.getElementById("knownMail").value
      let comments =  document.getElementById("knownComments").value
      //A random 6 figure number for e-mail verification
      let verificationCode = generateCode()

      dispatch(setEmail(mail))
      dispatch(setComments(comments))
      //Receiving access to the component we will redirect
      dispatch(verifyPurchase(true))
      //We save the code and email to the redux store                       
      dispatch(setVerificationCode(verificationCode))
      //We save the info that the customer is registered
      dispatch(checkCustomerRegistered(true))

      //Redirect to the next component
      navigate("./confirm-purchase", { replace: true} )
      //Sending http request to the server to send the verification code to the customer
      axios.post("http://localhost:5000/confirm-email", { mail: mail,
                                                          verificationCode: verificationCode })

    }

    return(<div className='customerInfoSection'>
              <div className = "customerInfo" >
                <h2 className='formHeading'>Delivery details</h2>
                <form id='customerForm'>                  
                  <label id='nameLabel' className='labels'>Name</label>
                  <input type="text" id="enterName"/>
                  <label id='addressLabel' className='labels'>Address</label>
                  <input type="text" id="enterAddress" />                  
                  <label id='floorLabel' className='labels'>Floor</label>
                  <input type="text" id="enterFloor" /> 
                  <label id='phoneLabel' className='labels'>Mobile phone</label>
                  <input type="number" id="enterPhone" />                    
                  <label id='emailLabel' className='labels'>Email</label>
                  <input type="email" id="enterEmail" />
                  <label id='commentsLabel' className='labels'>Additional comments</label>
                  <textarea type="text" id="enterComments" />
                  <div id="rememberMe">
                    <input type="checkbox" id="saveInfoPermission"/>
                    <p> Remember me </p>
                  </div>
                  <button onClick={ getPassword } id="submitForPassword">submit</button>
                </form> 
              </div>
              <div className = "registeredInfo">
                <h2 className='formHeading'>Already a customer? Just enter your email</h2>
                <form className='registeredForm'>
                  <label className='labels'>Email</label><br />
                  <input type="email" id="knownMail"/><br />
                  <label className='labels'>Additional comments</label><br />
                  <textarea type="text" id="knownComments" /><br />
                  <button onClick={ handleRegisteredCustomer } id="submitRegistered"> Submit </button>
                </form>
              </div>
            </div>
          )    
}