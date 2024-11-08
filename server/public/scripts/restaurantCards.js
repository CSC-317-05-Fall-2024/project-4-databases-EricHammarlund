/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/
/* Implementing deletion button functioanlity
*/ 

// /* Get all restaurant card elements using getElementByClassName*/
// let restaurantCardItems = document.getElementsByClassName("restaurant-card");

// /* Loop over all cards in restaurantCardItems to apply delete button event listener to each card*/
// for (let card of restaurantCardItems) {

//     /* For each card, define deleteButton using querySelector and delete-button class property */
//     let deleteButton = card.querySelector(".delete-button");

//     /* Add event listener to deleteButton var that responds on click */
//     deleteButton.addEventListener("click", (event) => {

//         // Button test - used for debugging and testing event listener
//         // item.style.backgroundColor = "green";

//         // Removing the specific restaurant card (item) from its parent using removeChild method
//         card.parentElement.removeChild(card);
//     });
// }

document.addEventListener('DOMContentLoaded', function() {
    const restaurantCardItems = document.getElementsByClassName("restaurant-card"); // get all restaurant elements using getElementByClassName

    // loop over all cards in the restaurantCardItems to apply delete button event listener to each card
    for (let card of restaurantCardItems) {

        // for each ard, define the deleteButton using querySelector and the delete button class assigned to these html elements
        let deleteButton = card.querySelector(".delete-button");

        // add the delete button eventListener and make it respond to click
        deleteButton.addEventListener("click", async (event) => {
            event.stopPropagation(); // prevents the click event from bubbling up to the card
            
            // get the restaurant id by using the id property injected for each card element in the restaurants.ejs file (within the for loop)
            const restaurantId = card.id;

            // nest inside try-catch for basic error handling 
            try {
                // Await the fetch request for deletion
                const response = await fetch(`/api/restaurants/${restaurantId}`, { method: 'DELETE' });
                
                if (response.ok) {
                    // once deletion is compelete, reload
                    card.remove(); // Remove the card from the DOM
                } else {
                    console.error('Failed to delete the restaurant. Status:', response.status);
                }
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        });

        // second eventListener for clicking the card itself
        // implemented because after deleting and adding restaurants, it becomes hard for the user to track the restaurant ids (which are not displayed), so directing to restaurant id pages via click is more user-friendly
        card.addEventListener("click", (event) => {
            const restaurantId = card.id;  // get the id of the clicked restaurant card
            // redirect to the specific restaurant details page using the card id
            window.location.href = `/restaurants/${restaurantId}`;
        });
    }
});
