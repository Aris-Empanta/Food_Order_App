import { fetchProducts } from "../redux/slice";
import { useEffect } from "react";
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "../redux/slice";
import "../css/products.css"

export const Products = () => {

    //We need the useParams hook, to fetch the data from the url so that
    // we render the component accordingly. 
    const params = useParams(); 

    //The api to edit the redux store for the shopping cart    
    const dispatch = useDispatch()
    const store = useSelector((state) => state.customer.products)
    
    
    useEffect(() => {
        
        const obviousProducts = document.getElementsByClassName(params.products) 

        // We fetch all products from database and set the global redux
        //store accordingly.
        dispatch(fetchProducts())

        // We let only products with category attribute same as the url
        //parameter to be displayed.
        for( let i=0; i < obviousProducts.length; i++) {

            obviousProducts[i].style.display = 'initial'
        }

    }, [])

    return(<div className="products">
               {store.map(item => <div className={item.Category + " product"}>
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