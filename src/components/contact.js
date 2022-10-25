import "../css/contact.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocation } from "@fortawesome/free-solid-svg-icons"
import { faMobileRetro } from "@fortawesome/free-solid-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"


export const Contact = () => {

    return(<div id="Contact">
            <div id="contactDetails">
              <h1 id="contactUsHeader"> Contact us</h1>
              <p className="contactInfo">
                <span className="contactIcon">
                  <FontAwesomeIcon icon={faLocation} />
                </span>
                &nbsp;&nbsp;Eptanissou 12 Kipseli Attiki 11257
              </p>
              <p className="contactInfo">
                <span className="contactIcon">
                  <FontAwesomeIcon icon={ faPhone } />
                </span>
                &nbsp;&nbsp;+30 210 3456782
              </p>  
              <p className="contactInfo">
                <span className="contactIcon">
                  <FontAwesomeIcon icon={ faMobileRetro } />
                </span>
                &nbsp;&nbsp;+30 6978564326
              </p>
              <p className="contactInfo">
                <span className="contactIcon">
                  <FontAwesomeIcon icon={ faEnvelope } />
                </span>
                &nbsp;&nbsp;aris.restaurant@gmail.com
              </p>
              <p className="contactInfo" id="orFillUp">...Or fill up the form.</p>
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