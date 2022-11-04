import "../css/orderCompleted.css"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import useStateWithCallback from 'use-state-with-callback';
import { showInvoiceLink } from "../functions/cartFunctions"
import { clearCart } from "../redux/slice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const OrderCompleted = () => {

    const [invoice, setInvoice ] = useStateWithCallback( null, showInvoiceLink )

    const mail = useSelector( state => state.customer.finalCart[0].customerMail)
    const dispatch = useDispatch()

    useEffect(() => {
                
        //We fetch the order's id from the server, and then
        // the url of the invoice pdf.Then the link to the pdf 
        //can be shown.
        axios.get("http://localhost:5000/orders/latest-order-id-of-" + mail)
             .then( res =>  setInvoice (res.data.invoice + ".pdf") )  
     
        //We clear the cart
       return () => dispatch(clearCart())
    })
    

    return(<div className="orderCompleted">
            <p className="completedTitle"> 
                Your order has been successfully made!
                Click the link below to get your invoice
            </p>
            <button id="arrowDown"><FontAwesomeIcon icon={ faArrowDown } /></button>
            <div id="loadingInvoice">
                <div class="loader"></div>
                <p>If the invoice doesnt Load refresh the page</p>
            </div>
            <a id="invoiceLink" href={ invoice } target="_blank" rel="noreferrer">
                Customer's invoice
            </a>
           </div>)
}