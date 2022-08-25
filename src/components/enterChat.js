import "../css/enterChat.css"
import { useState } from "react"

export const EnterChat = () => {

    const [username, setUsername] = useState("")
    //The function to enter the chat with your username
    const enterChat = (e) => {
        let username = document.getElementById("username").value

        username === "exists" ? e.preventDefault() :  setUsername(username)
    }

    return(<div className="enterChat">
            <form action={"/#/chat/" + username} onSubmit={enterChat}>
               <input type="text" placeholder="username" id="username"/>
               <input type="submit" /> 
            </form>
           </div>)
}