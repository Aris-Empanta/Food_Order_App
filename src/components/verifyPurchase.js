import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifyPurchase } from "../redux/slice"
import "../css/verifyPurchase.css"

export const VerifyPurchase = () => {

    const dispatch = useDispatch()  
    const verificationCode = useSelector( state => state.customer.verificationCode)

    useEffect(() => {

        //The component should not be accesible except we submit for purchase
        return () => {
            dispatch(verifyPurchase())
        } 
    })

    const submitCode = (e) => {
        e.preventDefault()
        let code = parseInt(document.getElementById("code").value)

        code === verificationCode ? alert('code correct') :
                                    alert('code wrong')     
    }

    return(<div className="verifyPurchase">
              <form>
                <label>Please put the verification code you received in your email</label>
                <input type="text" id="code"/>
                <button type="submit" onClick={ submitCode }>Confirm Purchase</button>
              </form>
            </div>)
}