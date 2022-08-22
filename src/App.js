import './App.css';
import { NavBar } from "./components/navBar"
import {Route,  Routes} from 'react-router-dom';
import { Products } from './components/products';
import { Chat } from './components/chat';

const App = () => {

  return (<div>
            <NavBar />
            <Routes>       
              <Route path=":products" element={<Products />} />
              <Route path="chat/:username" element={<Chat />} />
            </Routes>
          </div>
  );
}

export default App;
