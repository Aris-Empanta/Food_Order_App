import './App.css';
import { NavBar } from "./components/navBar"
import {Route,  Routes} from 'react-router-dom';
import { Home } from './components/home'
import { Products } from './components/products';
import { Chat } from './components/chat';
import { EnterChat } from './components/enterChat';
import { ShoppingCart } from './components/shoppingCart';
import { CustomerInfo } from './components/customerInfo';
import { VerifyPurchase } from './components/verifyPurchase';
import { OrderCompleted } from './components/orderCompleted';
import { Contact } from './components/contact';
import { LoadingApp } from './components/loadingApp';

const App = () => {

  return (<div>
            <NavBar />
            <LoadingApp />
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
              <Route path='contact' element={<Contact />} />         
            </Routes>
          </div>
  );
}

export default App;
