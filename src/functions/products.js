/*With below function, the scrollUp button will appear whenever
 the scrolling distance from top is more than 0*/
 export const showScrollUp = () => {

    let scrollUp = document.querySelector(".scrollUp")
    let distanceTop = window.pageYOffset

    if( distanceTop > 0) {
    scrollUp.style.display = "initial"
    } else {
    scrollUp.style.display = "none"
    }
}

export const scrollUp = () => {

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}