// The function that will send all the customer's
//info to the database.
export const saveCustomerInfo = (socket) => {

        let name = document.getElementById("enterName").value
        let address = document.getElementById("enterAddress").value
        let floor = document.getElementById("enterFloor").value
        let phone = document.getElementById("enterPhone").value
        let email =  document.getElementById("enterEmail").value
        let comments =  document.getElementById("enterComments").value


        socket.emit('customer data', { name: name,
                                       address: address,
                                       floor: floor,
                                       phone: phone,
                                       email: email,
                                       comments: comments 
                                      })
  }

//The function to generate verification code
export const generateCode = () => {

        let verificationCode = 100000 * Math.floor(Math.random() * 10) +
                             10000 * Math.floor(Math.random() * 10) +
                             1000 * Math.floor(Math.random() * 10) + 
                             100 * Math.floor(Math.random() * 10) + 
                             10 * Math.floor(Math.random() * 10) + 
                             Math.floor(Math.random() * 10)

        return verificationCode
}

//The function to configure the cart details to be sent to the server
export const getFinalCart = (cart) => {

      let name = document.getElementById("enterName").value
      let mail =  document.getElementById("enterEmail").value
      let address = document.getElementById("enterAddress").value
      let floor = document.getElementById("enterFloor").value
      let phone = document.getElementById("enterPhone").value
      let comments =  document.getElementById("enterComments").value


      //We add customer's details to the finalCart
      let finalCart = cart.map( item => { 
                                          const modifiedCart = {...item}

                                          modifiedCart["customerName"] = name
                                          modifiedCart["customerMail"] = mail                                         
                                          modifiedCart["price"] = item.price * item["quantity"]
                                          modifiedCart["comments"] = comments
                                          modifiedCart["address"] = address 
                                          modifiedCart["floor"] = floor
                                          modifiedCart["phone"] = phone 

                                          return modifiedCart
                                        })
 
        return finalCart
}

//The function to grab captcha's value
export const grabUserCaptcha = ( callback ) => {

                        let usersCaptcha = document.getElementById('userCaptcha').value
                
                        callback(usersCaptcha)
                }

//The function to generate captcha
export const generateCaptcha = ( callback ) => {

        const characters = ['a', 'b', 'c', 'd', 'e', 'f',
                             'g', 'h', 'i', 'j', 'k', 'l',
                             'm', 'n', 'o', 'p', 'q', 'r',
                             's', 't', 'u', 'v', 'w', 'x',
                             'y', 'z', 'A', 'B', 'C', 'D',
                             'E', 'F', 'G', 'H', 'I', 'J',
                             'K', 'L', 'M', 'N', 'O', 'P',
                             'Q', 'R', 'S', 'T', 'U', 'V',
                             'W', 'X', 'Y', 'Z', '0', '1',
                             '2', '3', '4', '5', '6', '7',
                             '8', '9']
        let captcha = []

        for( let i=0; i < 6; i++ ) {

                let char = characters[ Math.floor(Math.random() * characters.length) ]

                captcha.push(char)
        }

        callback(captcha.join(''))
}

//The function to get new verification code
export const getNewPassword = (dispatch, callback, email, axios ) => {

                //A random 6 figure number
                let verificationCode = 100000 * Math.floor(Math.random() * 10) +
                                       10000 * Math.floor(Math.random() * 10) +
                                       1000 * Math.floor(Math.random() * 10) + 
                                       100 * Math.floor(Math.random() * 10) + 
                                       10 * Math.floor(Math.random() * 10) + 
                                       Math.floor(Math.random() * 10)
                
                //We save it to the redux store                       
                dispatch(callback(verificationCode))

                axios.post("http://localhost:5000/confirm-email", { mail: email,
                                                                    verificationCode: verificationCode
                                                                   })
        }