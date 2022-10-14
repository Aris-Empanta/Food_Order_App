export const showMessage = (name, msg, date) => {
            
    let message = document.createElement("li")

    message.classList.add("messageInfoWrapper") 

    if(name === 'admin')message.classList.add("colorOfadmin")

    message.innerHTML = `<div class="senderAndDate">
                            <p class="senderName">${(name !== "admin" ? "me" : "admin")}</p>
                            <p class="sendDate">${date}</p>
                        </div>
                        <div class="messageTextWrapper"> 
                            <p class="messageText">&nbsp;${msg}</p>
                        </div>`
     
    let messages = document.getElementById("messages")
    messages.appendChild(message)
 }