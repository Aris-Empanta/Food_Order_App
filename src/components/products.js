import { fetchProducts } from "../redux/slice";
import { useEffect } from "react";
import {useParams} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "../redux/slice";
import { scrollUp, showScrollUp } from "../functions/products";
import "../css/products.css"
import { PizzaLoader } from "./pizzaLoader";

export const Products = () => {

    //We need the useParams hook, to fetch the data from the url so that
    // we render the component accordingly. 
    const params = useParams(); 

    /*With below listener, the scrollUp button will appear whenever
    the scrolling distance from top is more than 0*/
    window.addEventListener("scroll", showScrollUp)

    //The api to edit the redux store for the shopping cart    
    const dispatch = useDispatch()
    const store = useSelector((state) => state.customer.products)
    
    
    useEffect(() => {
        
        const obviousProducts = document.getElementsByClassName(params.products) 

        window.scrollTo(0,0)

        // We fetch all products from database and set the global redux
        //store accordingly.
        dispatch(fetchProducts())

        // We let only products with category attribute same as the url
        //parameter to be displayed.
        for( let i=0; i < obviousProducts.length; i++) {

            obviousProducts[i].style.display = 'initial'
        }

    }, [])

    return(<div id="products">                
               {store.map(item => <div className={item.Category + " product"}>
                                             <img className="productImage" src= { item.Image_name} />
                                             <p className="productName"> { item.Name } </p> 
                                             <p className="productDescription"> { item.Description } </p>
                                          
                                             <div className="priceAndCart"> 
                                                <p className="productPrice">{ item.Price + " " + item.Currency} </p>
                                                <span>
                                                    <button className="cartButton"
                                                            onClick={() => { dispatch(addToCart({
                                                                                    id: item.ID,
                                                                                    name: item.Name,
                                                                                    image: item.Image_name,
                                                                                    price: item.Price,
                                                                                    description: item.Description }))
                                                                            }}>Add to cart
                                                    </button>
                                                </span>
                                             </div>
                                     </div>)}
                <button class="scrollUp" onClick={ scrollUp } >
                    < FontAwesomeIcon icon={ faAnglesUp } />
                </button>
          </div>)
}