import "../css/contact.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocation } from "@fortawesome/free-solid-svg-icons"
import { faMobilePhone } from "@fortawesome/free-solid-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"


export const Contact = () => {

    return(<div id="Contact">
            <div id="contactDetails">
              <h1> Contact us</h1>
              <p><FontAwesomeIcon icon={faLocation} /> Eptanissou 12 Kipseli Attiki 11257</p>
              <p><FontAwesomeIcon icon={ faPhone } /> +30 210 3456782</p>  
              <p><FontAwesomeIcon icon={ faMobilePhone } /> +30 6978564326</p>
              <p><FontAwesomeIcon icon={ faEnvelope } /> aris.restaurant@gmail.com</p>
              <p>...Or fill up the form on the right side.</p>
            </div>
            <div id="formWrapper">
              <form id="contactForm">
                <label className="contactLabels" >Full name</label>
                <input type="text" className="inputField" />
                <label className="contactLabels" >Email</label>
                <input type="email" className="inputField" />
                <label className="contactLabels" >Phone</label>
                <input type="number" className="inputField" />
                <label className="contactLabels" >Your comments...</label>
                <textarea rows="5" className="inputField" id="commentsArea"/>
                <button type="submit" id="submitForm" >SUBMIT</button>
              </form>
            </div>
           </div>)
}