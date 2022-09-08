import React from 'react';
import "../css/customerInfo.css"
import { useSelector, useDispatch } from "react-redux"
import { submitCart } from '../redux/slice';
import { useEffect } from 'react';
import axios from 'axios';

export const CustomerInfo = () => {

    const dispatch = useDispatch()
    

    useEffect ( () => {      

      return () => {
      dispatch(submitCart())
    }   

    })

    const getPassword = () => {

      let enterEmail =  document.getElementById("enterEmail").value

      axios.post("http://localhost:5000/confirm-email", { mail: enterEmail })

    }

        return(<div className = "custommerInfo" >
                  <form>
                    <label>Enter your email</label>
                    <input type="email" id="enterEmail"></input>
                    <button onClick={ getPassword }>submit</button>
                  </form>
               </div>)
    
}