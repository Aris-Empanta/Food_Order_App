import React, { useState, useEffect } from 'react';
import "../css/customerInfo.css"
import { useDispatch, useSelector } from "react-redux"
import { setVerificationCode, 
         setCustomerName, 
         setEmail,
         setComments,
         verifyPurchase, 
         checkCustomerRegistered,
         setFinalCart} from '../redux/slice';
import { useNavigate } from "react-router-dom";
import { saveCustomerInfo, getFinalCart } from '../functions/cartFunctions';
import axios from 'axios';
import { socket } from "./chat"

export const CustomerInfo = () => {

    const [customersMails, setCustomersMails] = useState([])

    const dispatch = useDispatch()    
    const navigate = useNavigate()    
    const cart = useSelector( state => state.customer.finalCart )

    useEffect(() => {

        //We save to a state array all registered customers' mails and phones
        //To prevent duplicates in latervalidations. 
        axios.get('http://localhost:5000/customers/customers-info')
             .then( res => {
                              let customersMails = res.data.map( item => item.Email )

                              setCustomersMails( customersMails )                              
                            })
    }, setCustomersMails)
       
    //----------->  We send a verification code to the customer and 
    //-----------> store it in the redux store.
    const getPassword = (e) => {

      e.preventDefault()
      
      let name = document.getElementById("enterName").value
      let mail =  document.getElementById("enterEmail").value
      let saveInfoPermission = document.getElementById("saveInfoPermission").checked   
      let inputs = document.getElementsByClassName("inputs")
      let customerData = []

      //We build an array with all mandatory customer inputs.
      for(let input of inputs) {
        customerData.push(input.value)
      }   
      //We can proceed to the next step only without empty compulsory fields
      if(customerData.includes('')) {

          for(let input of inputs) {
            
            input.value === '' ? input.style.border = '1px solid red' :
                                 input.style.border = 'none' 
          }

          alert("There are empty compulsory fields!")
      } else {
                    
          //The final cart details to be sent
          let finalCart = getFinalCart(cart)
          
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
          axios.post("http://localhost:5000/email/confirm", { mail: mail })
          //We save customer's info only if customer agrees          
          if ( saveInfoPermission === true ) saveCustomerInfo(socket) 
        }
    }

    //-----------> The function to fetch data of registered customer
    const handleRegisteredCustomer = (e) => {

      e.preventDefault()

      let mail =  document.getElementById("knownMail").value
      let comments =  document.getElementById("knownComments").value
      
      
      //Mail input shouldnt be empty and should be a registered one
      if(mail === '') {

        document.getElementById("knownMail").style.border = '1px solid red'
        alert('Please enter your email.')
      } 
      else if(customersMails.includes(mail) === false) {

        document.getElementById("knownMail").style.border = '1px solid red'
        alert('There is no registered customer with mail ' + mail)
      }
      else {

            dispatch(setEmail(mail))
            dispatch(setComments(comments))
            //Receiving access to the component we will redirect
            dispatch(verifyPurchase(true))
            //We save the info that the customer is registered
            dispatch(checkCustomerRegistered(true))

          //Redirect to the next component
            navigate("./confirm-purchase", { replace: true} )
            //Sending http request to the server to send the verification code to the customer
            axios.post("http://localhost:5000/email/confirm", { mail: mail }) 
          }

    }

    return(<div className='customerInfoSection'>
              <div className = "customerInfo" >
                <h2 className='formHeading'>Delivery details</h2>
                <form id='customerForm'>                  
                  <label id='nameLabel' className='labels'>Name*</label>
                  <input type="text" id="enterName" className='inputs'/>
                  <label id='addressLabel' className='labels'>Address*</label>
                  <input type="text" id="enterAddress" className='inputs'/>                  
                  <label id='floorLabel' className='labels'>Floor*</label>
                  <input type="text" id="enterFloor" className='inputs'/> 
                  <label id='phoneLabel' className='labels'>Mobile phone*</label>
                  <input type="number" id="enterPhone" className='inputs'/>                    
                  <label id='emailLabel' className='labels'>Email*</label>
                  <input type="email" id="enterEmail" className='inputs'/>
                  <label id='commentsLabel' className='labels'>Additional comments</label>
                  <textarea type="text" id="enterComments" />
                  <div id="rememberMe">
                    <input type="checkbox" id="saveInfoPermission"/>
                    <p id='saveInfo'> Save info </p>
                  </div>
                  <button onClick={ getPassword } id="submitForPassword">Get password</button>
                </form> 
              </div>
              <div className = "registeredInfo">
                <h2 className='formHeading'>Already a customer? Just enter your email</h2>
                <form className='registeredForm'>
                  <label className='labels'>Email*</label>
                  <input type="email" id="knownMail"/>
                  <label className='labels'>Additional comments</label>
                  <textarea type="text" id="knownComments" />
                  <button onClick={ handleRegisteredCustomer } id="submitRegistered">Get password</button>
                </form>
              </div>
            </div>
          )    
}