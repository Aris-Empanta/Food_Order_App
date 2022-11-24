import "../css/enterChat.css"
import { useState, useEffect } from "react"

export const EnterChat = () => {

    const [username, setUsername] = useState("")

    useEffect(() => window.scrollTo(0,0))

    //The function to enter the chat with your username
    const enterChat = (e) => {

        let username = document.getElementById("username").value

        username === "exists" ? e.preventDefault() :  setUsername(username)
    }

    return(<div className="enterChat">
             <div id="chatFormWrapper">
                <p id="chatLabel">Live chat</p>
                <form action={"/#/chat/" + username} 
                      autoComplete="off" 
                      className="usernameForm"
                      onSubmit={ enterChat }>                    
                <input type="text" placeholder="Enter a username" id="username"/>
                <input type="submit" value="Enter chat" id="enterChatButton"/> 
                </form>
             </div>
           </div>)
}