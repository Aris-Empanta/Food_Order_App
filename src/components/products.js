import axios from "axios"
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

export const Products = () => {

    const [products, setProducts] = useState([])
    

    //We need the useParams hook, to fetch the data from the url so that we render the component accordingly. 
    const params = useParams();

    useEffect(() => {

        axios.get("http://localhost:5000/products/by-category/" + params.products).then((res) => {

            setProducts( res.data )
        }) 
      
    }, [setProducts])

    return(<div>
               {products.map(item => <p> { item.Name } </p>)}
          </div>)
}