import "../css/chat.css"
import io from 'socket.io-client';
import { useEffect } from "react"
import { showMessage } from "../functions/chat";
import {useParams} from 'react-router-dom';
import axios from 'axios'

export const Chat = () => {    

    const socket = io(`http://localhost:5000`);
    const params = useParams() 

    useEffect( () => {
        
        let username = params.username 
        //Append the received and sent messages to the page 
        socket.on("chat message", showMessage)
               
        socket.emit("customerRoom", username)          
       }
    )  

 
 
    const sendMessage =  (e) => {
          e.preventDefault()

          let username = params.username           
          let message = document.getElementById("input").value        
          //We send the message to the server, and the username to create a room. 
          socket.emit("chat message", {message: message,
                                       username: username})
          axios.post('http://localhost:5000/chat-messages', {message: message,
                                                             username: username})
    } 

    return(<div className="chat">
                <ul id="messages">
                    
                </ul>
                <form id="form" action="" onSubmit={ sendMessage } >
                    <input id="input" /><button>Send</button>
                </form>
           </div>)
}