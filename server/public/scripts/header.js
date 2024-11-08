/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/

/* Find header element using querySelector and the header tag; use innerHTML to inject desired html code, i.e. header image */
let header =  document.querySelector('header');
header.innerHTML='<img class="header-img" src="/images/düsseldorf.png"/>';

/* Find nav element using querySelector and the nav tag; use className to give a className used in styles.css for styling; innerHTML to inject desired html code, i.e. links/anchors */
let nav = document.querySelector('nav');
nav.className = "navbar";
nav.innerHTML='<a href="/home">Home</a><a href="/attractions">Attractions</a><a href="/restaurants">Restaurants</a><a href="/newrestaurant">New Restaurant</a>';

/* Find footer element using querySelector and the footer tag; use innerHTML to inject desired html code, i.e. footer span */
let footer = document.querySelector('footer');
footer.innerHTML='<span>Contact info: ehammarlund@sfsu.edu</span>';
