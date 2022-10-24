import './App.css';
import { NavBar } from "./components/navBar"
import {Route,  Routes} from 'react-router-dom';
import { Home } from './components/home'
import { Products } from './components/products';
import { Chat } from './components/chat';
import { EnterChat } from './components/enterChat';
import { ShoppingCart } from './components/shoppingCart';
import { CustomerInfo } from './components/customerInfo';
import { useSelector } from 'react-redux';
import { VerifyPurchase } from './components/verifyPurchase';
import { OrderCompleted } from './components/orderCompleted';


const App = () => {

  const cartSubmitted = useSelector( state => state.customer.cartSubmitted )
  const gotVerificationCode = useSelector( state => state.customer.gotVerificationCode )

  return (<div>
            <NavBar />
            <Routes>       
              <Route path='/' element={<Home />}/>
              <Route path=":products" element={<Products />} />
              <Route path="chat" element={<EnterChat />}/>
              <Route path="chat/:username" element={<Chat />} />
              <Route path="shopping-cart" element={<ShoppingCart />} />              
              <Route path="shopping-cart/customer-info" element={ <CustomerInfo /> }/>      
              <Route path="shopping-cart/customer-info/confirm-purchase" 
                     element = { <VerifyPurchase /> } />   
              <Route path='shopping-cart/customer-info/confirm-purchase/order-completed'
                     element = { <OrderCompleted /> } />           
            </Routes>
          </div>
  );
}

export default App;
