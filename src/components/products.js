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

    //The api to edit the redux store for the shopping cart    
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
                                             <button onClick={() => { dispatch(addToCart({
                                                                            id: item.ID,
                                                                            name: item.Name,
                                                                            image: item.Image_name,
                                                                            price: item.Delivery_price,
                                                                            description: item.Description
                                                                        }))
                                                                      }}>Add to basket </button>
                                     </div>)}
          </div>)
}