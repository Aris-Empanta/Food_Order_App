import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setVerificationCode, setFinalCart} from "../redux/slice"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../css/verifyPurchase.css"
import { socket } from "./chat"
import { grabUserCaptcha,
         generateCaptcha,
         getNewPassword, completeOrder } from "../functions/cartFunctions"

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

    //React router hooks needed
    const navigate = useNavigate()

    useEffect(() => {
              
      //We generate captcha
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

      socket.on("new order", () => navigate("./order-completed", { replace: true} ) ) 
    }, [])
        
    //Below function send customer's order to the server
    const sendOrder = (e) => {

                      e.preventDefault()

                            captcha === userCaptcha ? 
                       completeOrder(socket, cart)  : 
                      alert('verification failed')        
          }

    return(<div className="verifyPurchase">
              <h1 id="verificationTitle">Please verify the purchase</h1>
              <form id="verifyForm">
                <div id="captchaOuterWrapper">
                  <div id="captchaWrapper">
                    <div id="captchaInputWrapper">
                      <p className="verificationTitles"> Type the characters bellow</p>
                      <input type="text" id="userCaptcha" onChange={ () => grabUserCaptcha(setUserCaptcha) }/>
                    </div>           
                    <div id="captchaBox">
                      <p id="captchaLetters">{ captcha }</p>                    
                      <button onClick={ () => generateCaptcha(setCaptcha) } id="refreshCaptcha">
                        <FontAwesomeIcon icon={ faRefresh } />
                      </button>
                    </div>                
                  </div>
                </div>
                <button id="confirmPurchase" type="submit" onClick={ sendOrder }>Confirm Purchase</button>                
              </form>
            </div>)
}