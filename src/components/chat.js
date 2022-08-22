import "../css/chat.css"
import io from 'socket.io-client';
import { useEffect } from "react"
import { showMessage } from "../functions/chat";
import {useParams} from 'react-router-dom';

export const Chat = () => {    

    const socket = io(`http://localhost:5000`);
    const params = useParams() 

    useEffect( () => {
 
          socket.on('message', showMessage)
 
          socket.on("chat message", showMessage)
          
          const username = params.username        
          //Sending socket id to server as room
          socket.on('connect', () => {
              
              socket.emit("room", username)
              console.log(username)
          })
       }
    )  

 
 
    const sendMessage =  (e) => {
          e.preventDefault()
          
          let message = document.getElementById("input").value
 
          socket.emit("chat message", {message: message,
                                        id: socket.id})
    } 

    return(<div className="chat">
                <ul id="messages">
                    <li>hey</li>
                </ul>
                <form id="form" action="" onSubmit={ sendMessage } >
                    <input id="input" /><button>Send</button>
                </form>
           </div>)
}