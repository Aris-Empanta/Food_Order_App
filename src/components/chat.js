import "../css/chat.css"
import io from 'socket.io-client';
import { useEffect } from "react"
import useStateWithCallback from 'use-state-with-callback';
import { showMessage } from "../functions/chat";
import {useParams} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import axios from 'axios'

//Initializing socket.io and url's parameter name object.
export const socket = io(`http://localhost:5000`);

//The dynamically created component we are redirected to when we enter our username to chat with admin.
export const Chat = () => {    
    
    //The state needed
    const [messagesHistory, setMessagesHistory ] = useStateWithCallback([], () => window.scrollTo(0, document.body.scrollHeight) )

    
    const params = useParams() 
  
    useEffect( () => {
                        //Holding customer's name from url in a variable.
                        let customer = params.username 
                        let userType = document.getElementById("userTyping") 

                        //Fetching all the old messages to be displayed.
                        axios.get('http://localhost:5000/chat-messages')
                             .then(res =>  { 
                                              let messages = res.data.filter(item => item.Customer === customer)
                                              if(messagesHistory.length !== messages.length) setMessagesHistory(messages)
                                              })
                             .catch((err) => console.log(err))     
                        
                                                
                        //Handling the socket.io event that will send us a message from a specific customer and displaying it.
                        socket.on('customer '+ customer, (data) => { let sender = data.sender === customer? 'me' : 'admin'
                                                                     let message = data.message
                                                                     let date = data.date

                                                                     data.sender === 'admin' ? showMessage('admin', message, date ) :
                                                                                               showMessage('me', message, date )
                                                                     window.scrollTo(0, document.body.scrollHeight);                                                           
                                                                    })     
                        //below listeners notify if admin is typing or not
                        socket.on('Admin typing to ' + customer, () => userType.style.display = 'initial')

                        socket.on('Admin not typing to ' + customer, () => userType.style.display = 'none')

                        return () => {
                          
                          socket.off('customer '+ customer)
                        }
                        
                    }, [])  
    
    //The function that send notification to the admin that a specific customer is typing 
    const userTyping = () => {

      let customer = params.username 
      let inputValue = document.getElementById('input').value

      inputValue === ''? socket.emit('No typing', customer ) : socket.emit('I type', customer )     
    }
 
    /*The function to send a message to the admin in real time,
      saving it in the database and displaying it.*/
    const sendMessage =  (e) => {
          e.preventDefault()

          let inputMessage = document.getElementById("input")
          let username = params.username 
          let sender = params.username         
          let message = document.getElementById("input").value   
          
          let data = { sender: sender,
                       message: message,
                       username: username
                     } 

          if (inputMessage.value) {

              socket.emit('chat message', data)     
              socket.emit('No typing', sender )         
              inputMessage.value = '';
              window.scrollTo(0, document.body.scrollHeight);
            }
        } 

    return(<div className="chat">
                <ul id="messages">
                    { messagesHistory.map( item =>  <li className={"messageInfoWrapper colorOf"+ item.Sender}>
                                                      <div className="senderAndDate">
                                                        <p className="senderName">{(item.Sender === "admin" ? "admin" : "me")}</p>
                                                        <p className="sendDate">{item.dateReceived}</p>
                                                      </div>
                                                      <div className="messageTextWrapper">
                                                        <p className="messageText">&nbsp;{item.Message}</p>
                                                      </div>
                                                    </li>) } 
                </ul>
                <div id="userTyping">Admin is typing...</div>
                <form id="form" action="" onSubmit={ sendMessage } >
                    <input id="input" onChange={ userTyping }/>
                    <button id="sendButton">
                      <FontAwesomeIcon icon={ faPaperPlane } />
                    </button>
                </form>
           </div>) 
}