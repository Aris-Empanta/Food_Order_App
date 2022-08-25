import "../css/chat.css"
import io from 'socket.io-client';
import { useEffect, useState } from "react"
import { showMessage } from "../functions/chat";
import {useParams} from 'react-router-dom';
import axios from 'axios'

export const Chat = () => {    
    
    const [messagesHistory, setMessagesHistory ] = useState([])

    const socket = io(`http://localhost:5000`);
    const params = useParams() 

    useEffect( () => {

        let customer = params.username 

        axios.get('http://localhost:5000/chat-messages')
             .then(res =>  { 
                            let messages = res.data.filter(item => item.Customer === customer)
                            if(messagesHistory.length !== messages.length) setMessagesHistory(messages)
                            })
                                                                      
        
        //Append the received and sent messages to the page 
        socket.on('customer '+ customer, (data) => { let sender = data.sender === customer? 'me' : 'admin'
                                                     let message = data.message
                                                     if(data.sender === 'admin') showMessage(sender, message)
                                                     console.log(0)
                                                    })                
       }, [])  

 
 
    const sendMessage =  (e) => {
          e.preventDefault()
          
          let username = params.username 
          let sender = params.username         
          let message = document.getElementById("input").value   
          //We send the message to the server, and the username to create a room. 
          socket.emit('chat message', { message: message,
                                        username: username,
                                        sender: sender
                                      })
          let data = { sender: sender,
                       message: message,
                       username: username
                    }
          
        axios.post('http://localhost:5000/chat-messages', data )
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