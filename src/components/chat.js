import "../css/chat.css"
import io from 'socket.io-client';
import { useEffect, useState } from "react"
import { showMessage } from "../functions/chat";
import {useParams} from 'react-router-dom';
import axios from 'axios'

//Initializing socket.io and url's parameter name object.
export const socket = io(`http://localhost:5001`);

//The dynamically created component we are redirected to when we enter our username to chat with admin.
export const Chat = () => {    
    
    //The state needed
    const [messagesHistory, setMessagesHistory ] = useState([])

    
    const params = useParams() 

    useEffect( () => {
                        //Holding customer's name from url in a variable.
                        let customer = params.username 

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
                                                                    if(data.sender === 'admin') showMessage(sender, message)                                                                   
                                                                    })      
                                                                    
                      //We disconnect the socket, otherwise side effects like double messages wil occur                           
                      return () => {
                        socket.disconnect()
                    }
                    }, [])  

 
    /*The function to send a message to the admin in real time,
      saving it in the database and displaying it.*/
    const sendMessage =  (e) => {
          e.preventDefault()
          
          let username = params.username 
          let sender = params.username         
          let message = document.getElementById("input").value   
          
          let data = { sender: sender,
                       message: message,
                       username: username
                     }

          socket.emit('chat message', data)
          showMessage("me", message)
        } 

    return(<div className="chat">
                <ul id="messages">
                    { messagesHistory.map( item => <li>{(item.Sender === "admin"? "admin" : "me") + ": " + item.Message}</li>) } 
                </ul>
                <form id="form" action="" onSubmit={ sendMessage } >
                    <input id="input" /><button>Send</button>
                </form>
           </div>)
}