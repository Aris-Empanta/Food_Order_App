import './App.css';
import { NavBar } from "./components/navBar"
import {Route,  Routes} from 'react-router-dom';
import { Products } from './components/products';
import { Chat } from './components/chat';
import { EnterChat } from './components/enterChat';

const App = () => {

  return (<div>
            <NavBar />
            <Routes>       
              <Route path=":products" element={<Products />} />
              <Route path="chat" element={<EnterChat/>}/>
              <Route path="chat/:username" element={<Chat />} />
            </Routes>
          </div>
  );
}

export default App;
