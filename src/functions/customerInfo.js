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

export const generateCode = () => {

        let verificationCode = 100000 * Math.floor(Math.random() * 10) +
                             10000 * Math.floor(Math.random() * 10) +
                             1000 * Math.floor(Math.random() * 10) + 
                             100 * Math.floor(Math.random() * 10) + 
                             10 * Math.floor(Math.random() * 10) + 
                             Math.floor(Math.random() * 10)

        return verificationCode
}

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