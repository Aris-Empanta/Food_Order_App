import './App.css';
import { NavBar } from "./components/navBar"
import {Route,  Routes} from 'react-router-dom';
import { Products } from './components/products';
import { Chat } from './components/chat';
import { EnterChat } from './components/enterChat';
import { ShoppingCart } from './components/shoppingCart';
import { CustomerInfo } from './components/customerInfo';
import { PageNotFound } from './components/pageNotFound';
import { useSelector } from 'react-redux';
import { VerifyPurchase } from './components/verifyPurchase';


const App = () => {

  const cartSubmitted = useSelector( state => state.customer.cartSubmitted )
  const gotVerificationCode = useSelector( state => state.customer.gotVerificationCode )

  return (<div>
            <NavBar />
            <Routes>       
              <Route path=":products" element={<Products />} />
              <Route path="chat" element={<EnterChat />}/>
              <Route path="chat/:username" element={<Chat />} />
              <Route path="shopping-cart" element={<ShoppingCart />} />              
              <Route path="shopping-cart/customer-info" element={cartSubmitted === true ? <CustomerInfo /> :
                                                                                          <PageNotFound />}/>      
              <Route path="shopping-cart/customer-info/confirm-purchase" 
                     element = {gotVerificationCode === true ? <VerifyPurchase /> :
                                                               <PageNotFound /> } />      
            </Routes>
          </div>
  );
}

export default App;
