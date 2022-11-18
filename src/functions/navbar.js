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

export const handleNavbar = () => {

    let lowerNavbar = document.getElementById("smallScreenNavbar")
    let xMark = document.getElementById("xMarkIcon")
    let barsIcon = document.getElementById("barsIcon")
    

    if( lowerNavbar.style.transform === "translateX(-100%)" ) { 

          lowerNavbar.style.transform = "translateX(0)" 
          xMark.style.display = "initial"
          barsIcon.style.display = "none"
         } 
    else {

          lowerNavbar.style.transform = "translateX(-100%)"
          xMark.style.display = "none"
          xMark.style.transform = "rotate(180deg)"
          barsIcon.style.display = "initial"
         }


}

export const hideNavbar = () => {

    let navbar = document.getElementById("smallScreenNavbar")
    
    navbar.style.display = 'none'
}

export const handeAppLoading = () => {
    
        let navbarWrapper = document.getElementById("navbarWrapper")
        let loadingApp = document.getElementById("loadingApp")

        navbarWrapper.style.display = "initial"
        loadingApp.style.display = "none"
}