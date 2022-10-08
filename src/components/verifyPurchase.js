import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifyPurchase,
         setVerificationCode, 
         setFinalCart} from "../redux/slice"
import axios from "axios"
import "../css/verifyPurchase.css"
import { socket } from "./chat"
import { grabUserCaptcha,
         generateCaptcha,
         getNewPassword } from "../functions/cartFunctions"

export const VerifyPurchase = () => {

    //The local state
    const [ captcha, setCaptcha ] = useState("")
    const [ userCaptcha, setUserCaptcha ] = useState("")   

    //The global redux state we need
    const dispatch = useDispatch()  
    const verificationCode = useSelector( state => state.customer.verificationCode)
    const email = useSelector( state => state.customer.email)
    const comments = useSelector( state => state.customer.comments)
    const cart = useSelector( state => state.customer.finalCart)
    const customerIsRegistered = useSelector( state => state.customer.customerIsRegistered)

    useEffect(() => {
              
      //The confirmation code should last for only 5 minutes
      setTimeout( () => dispatch(setVerificationCode(0)), 300000 )
      generateCaptcha(setCaptcha)
      
      if( customerIsRegistered === true) {  
        //With customer's email, we fetch all the other customer's details
        axios.get("http://localhost:5000/customers/customer-by-" + email)
             .then( res => {
                              let finalCart = cart.map( item => { 
                                                          const modifiedCart = {...item}                                                                                                 
                                                          
                                                          modifiedCart["comments"] = comments
                                                          modifiedCart["address"] = res.data.Address 
                                                          modifiedCart["floor"] = res.data.Floor
                                                          modifiedCart["phone"] = res.data.Phone  
                                                          modifiedCart["customerName"] = res.data.Name
                                                          modifiedCart["customerMail"] = email                                                          

                                                          return modifiedCart                                                        
                                                      })
                                //Saving all cart details to the redux store
                                dispatch(setFinalCart(finalCart))                                               
                            })
              }
        //Reseting the verification code once component unmounts
        return () => {
            dispatch(setVerificationCode(""))
        } 
    }, [])
        
    //Below function send customer's order to the server
    const sendOrder = () => {

              //Input code should be the same data type as stored code
              let code = parseInt(document.getElementById("code").value)

              code === verificationCode || captcha === userCaptcha ? 
                                          socket.emit("send order",cart) :
                                          alert('verification failed')     
          }

    return(<div className="verifyPurchase">
              <form id="verifyForm">
                <label>Please put the verification code you received in your email</label>
                <input type="text" id="code"/>
                <button onClick={ () => getNewPassword( dispatch,
                                                        setVerificationCode,
                                                        email,
                                                        axios) }> Get new code </button>
                <h1>Or...</h1>
                <p>Type the characters bellow</p>
                <p>{ captcha }</p>
                <input type="text" id="userCaptcha" onChange={ () => grabUserCaptcha(setUserCaptcha) }/>
                <button onClick={ () => generateCaptcha(setCaptcha) }>New</button>
                <button type="submit" onClick={ sendOrder }>Confirm Purchase</button>                
              </form>
            </div>)
}