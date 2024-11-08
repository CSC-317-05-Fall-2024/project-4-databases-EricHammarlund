import express from 'express';
import { createRestaurant, deleteRestaurant } from '../data/restaurants.js'; // import create and delete methods implemented in data file


const router = express.Router();

// Add routes here
// Add restaurant
router.post('/restaurants', (req, resp) => {
    const restaurantData = req.body;
    try {
        const restaurant = createRestaurant(restaurantData);  // Add restaurant to data
        resp.status(200).json(restaurant);  // Return the new restaurant data
    } catch (error) {
        console.log(error);
        resp.status(500).json({"message": `${error}`});
    }
});

// Delete restaurant
router.delete('/restaurants/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    try {
        const restaurant = deleteRestaurant(id);
        resp.status(200).json(restaurant);
    } catch (error) {
        resp.status(500).json({"message": `${error}`});
    }
});

export {router as backendRouter}; // need to export to use in server.js