// Below function shows only products with the same category name as the
//url parameter, and hides the rest, once we click a certain route.
export const showProducts = (category) => {

    const obviousProducts = document.getElementsByClassName(category) 
    const allProducts = document.getElementsByClassName('product')

    //Hides all products
    for( let i=0; i < allProducts.length; i++) {

        allProducts[i].style.display = 'none'
    }

    //Show only the desirable ones
    for( let i=0; i < obviousProducts.length; i++) {

        obviousProducts[i].style.display = 'initial'
    }
}

export const showNavbar = () => {

    let navbar = document.getElementById("smallScreenNavbar")

    navbar.style.transform === "translateX(-100%)" ? 
    navbar.style.transform = "translateX(0)" : 
    navbar.style.transform = "translateX(-100%)"
}