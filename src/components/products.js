import axios from "axios"
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "../redux/slice";
import "../css/products.css"

export const Products = () => {

    const [products, setProducts] = useState([])
    

    //We need the useParams hook, to fetch the data from the url so that we render the component accordingly. 
    const params = useParams();
    //The 2 apis to access and edit the redux store
    const cart = useSelector((state) => state.cart.value)
    const dispatch = useDispatch()

    useEffect(() => {

        axios.get("http://localhost:5000/products/by-category/" + params.products).then((res) => {

            
            setProducts( res.data )
        }) 

        
      
    }, [])

    return(<div className="products">
               {products.map(item => <div className="product">
                                             <img className="productImage" src= { item.Image_name} />
                                             <p> { item.Name } </p> 
                                             <p> { item.Description } </p>
                                             <p> Price: { item.Delivery_price + " " + item.Currency}</p>
                                             <button onClick={() => { dispatch(addToCart(item.ID))
                                                                      console.log(cart)}}>Add to basket </button>
                                     </div>)}
                <p>{cart}</p>
          </div>)
}