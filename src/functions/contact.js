//The function to send the form's data to the server
export const sendForm = (axios) => {
    
    let name = document.getElementById("contactName").value
    let email = document.getElementById("contactEmail").value
    let phone = document.getElementById("contactPhone").value
    let comments = document.getElementById("commentsArea").value

    let formData = {
                     name: name,
                     email: email,
                     phone: phone,
                     comments: comments
                    }
    
    //The function to actually send the form                
    const sendMessage = () => {

        axios.post("http://localhost:5000/email/customer-form", formData)
        alert("Your message was successfully sent!")
        //Emptying the input fields after submitting the form
        document.getElementById("contactName").value = ''
        document.getElementById("contactEmail").value = ''
        document.getElementById("contactPhone").value = ''
        document.getElementById("commentsArea").value = ''
    }

    //We dont allow empty fields
    name !== "" && email !== "" && phone.length > 0 && comments !== "" ?
                                                         sendMessage() :
                          alert("There are empty fields in the form!")
}