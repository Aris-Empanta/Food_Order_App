import "../css/home.css"
import fastFood from "../css/images/fast_food.png"

export const Home = () => {

    return(<div id="home">
                <p id="welcomeText">Welcome to the best 
                    <p id="fastFood"> FAST FOOD </p> 
                    restaurant in the city
                </p>
                <img id="fastFoodImage" src={ fastFood }/>
           </div>)
}