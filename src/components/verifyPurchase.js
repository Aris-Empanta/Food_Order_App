import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifyPurchase,
         setVerificationCode } from "../redux/slice"
import axios from "axios"
import "../css/verifyPurchase.css"
import { socket } from "./chat"

export const VerifyPurchase = () => {

    const dispatch = useDispatch()  
    const verificationCode = useSelector( state => state.customer.verificationCode)
    const email = useSelector( state => state.customer.email)
    const cart = useSelector( state => state.customer.finalCart)

    useEffect(() => {
        
        //The confirmation code should last for only 5 minutes
        //setTimeout( () => dispatch(setVerificationCode(0)), 300000 )
        
        //The component should not be accesible except we submit for purchase
        return () => {
            dispatch(verifyPurchase(false))
            dispatch(setVerificationCode(""))
        } 
    }, []) 

    const getNewPassword = () => {

        //A random 6 figure number
        let verificationCode = 100000 * Math.floor(Math.random() * 10) +
        10000 * Math.floor(Math.random() * 10) +
        1000 * Math.floor(Math.random() * 10) + 
        100 * Math.floor(Math.random() * 10) + 
        10 * Math.floor(Math.random() * 10) + 
        Math.floor(Math.random() * 10)
        
        //We save it to the redux store                       
        dispatch(setVerificationCode(verificationCode))

        axios.post("http://localhost:5000/confirm-email", { mail: email,
                                                          verificationCode: verificationCode
                                                        })
    }

    const submitCode = (e) => {
              e.preventDefault()
              //Input code should be the same data type as stored code
              let code = parseInt(document.getElementById("code").value)

              code === verificationCode ? socket.emit("send order",cart) :
                                          alert('code wrong')     
          }

    return(<div className="verifyPurchase">
              <form>
                <label>Please put the verification code you received in your email</label>
                <input type="text" id="code"/>
                <button onClick={ getNewPassword }> Get new code </button>
                <button type="submit" onClick={ submitCode }>Confirm Purchase</button>                
              </form>
            </div>)
}