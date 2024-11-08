import { pool } from '../config/database.js';

// Get a list of restaurants
const getRestaurants = async () => {
    const results = await pool.query('SELECT * FROM restaurants');
    console.log(results.rows);
    return results.rows;
};


// Get a restaurant by id
const getRestaurant = async (id) => {
    const results = await pool.query(
        'SELECT * FROM restaurants WHERE id=$1', [id]);
    return results.rows[0]; // no error checking, assumes 1 row that matches
};

// Create a new restaurant entry
const createRestaurant = async (data) => {
    const { name, address, phone, image } = data;
    const results = await pool.query(
        'INSERT INTO restaurants (name, address, phone, image) VALUES ($1, $2, $3, $4) RETURNING *',
        [ name, address, phone, image ]); 
    return results.rows[0];
};

// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    const restaurantToDelete = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    if (restaurantToDelete.rows.length === 0) {  // check if restaurant with passed id is present in array
        throw new Error(`restaurant ${id} not found.`);
    }
    await pool.query('DELETE FROM restaurants WHERE id = $1', [id]);
    return restaurantToDelete.rows[0];
};

// Get Review for given Restaurant (by id)
const getReviewsForRestaurant = async (restaurant_id) => {
    try {
        const results = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [restaurant_id]);
        return results.rows;
    } catch (error) {
        console.error (error.message);
    }
};

export {getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant};   // must export to use in other files