import './App.css';
import { NavBar } from "./components/navBar"
import {Route,  Routes} from 'react-router-dom';
import { Products } from './components/products';

const App = () => {

  return (<div>
            <NavBar />
            <Routes>       
              <Route path=":products" element={<Products />} />
            </Routes>
          </div>
  );
}

export default App;
