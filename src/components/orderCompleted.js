import "../css/orderCompleted.css"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchInvoice } from "../functions/cartFunctions"
import { clearCart } from "../redux/slice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const OrderCompleted = () => {

    const [invoice, setInvoice ] = useState("")

    const mail = useSelector( state => state.customer.finalCart[0].customerMail)
    const dispatch = useDispatch()

    useEffect(() => {
        
        let loading = document.getElementById("loadingInvoice")
        let invoiceLink = document.getElementById("invoiceLink")

        invoiceLink.style.display = "none"
        
        //We fetch the order's id from the server, and then
        // the url of the invoice pdf.Then the link to the pdf 
        //can be shown.
        axios.get("http://localhost:5000/orders/latest-order-id-of-" + mail)
             .then( res =>  fetchInvoice(axios, res.data.id, setInvoice) ) 
             .then(() => {  
                            //The link for the invoice will be displayed only when
                            //we fetch the url, for the case it will take time.
                            invoiceLink.style.display = "initial"
                            loading.style.display = "none"
                        }) 
        //We clear the cart
       return () => dispatch(clearCart())
    })
    

    return(<div className="orderCompleted">
            <p className="completedTitle"> 
                Your order has been successfully made!
                Click the link below to get your invoice
            </p>
            <button id="arrowDown"><FontAwesomeIcon icon={ faArrowDown } /></button>
            <p id="loadingInvoice">Loading...</p>
            <a id="invoiceLink" href={ invoice } target="_blank" rel="noreferrer">Customer's invoice</a>
           </div>)
}