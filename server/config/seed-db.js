/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        console.log('dropping tables...');
        const dropTablesQuery = `
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        console.log('creating restaurants table...');
        const createQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name TEXT NOT NULL,
                address TEXT NOT NULL,
                phone TEXT,
                image TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS reviews (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                rating INT NOT NULL,
                content TEXT,
                restaurant_id INT NOT NULL,
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
            );
        `;
        await pool.query(createQuery);
        console.log('created restaurants and reviews');

    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        console.log('adding initial data...');
        const insertQuery = `
        INSERT INTO restaurants (name, address, phone, image) VALUES
            ('Münstermanns Kontor', 'Hohe Straße 11, Düsseldorf 40213, Germany', '(+49) 211 1300416', 'images/restaurant1.png');

        INSERT INTO restaurants (name, address, phone, image) VALUES
            ('The Dutchy', 'Königsallee 11, Düsseldorf 40212, Germany', '(+49) 211 16090500', 'images/restaurant2.png');

        INSERT INTO restaurants (name, address, phone, image) VALUES
            ('Nagaya', 'Klosterstraße 42, Düsseldorf 40211, Germany', '(+49) 211 8639636', 'images/restaurant3.png');


        INSERT INTO restaurants (name, address, phone, image) VALUES
            ('Konditorei Heinemann', 'Martin-Luther-Platz 32, Düsseldorf 40212, Germany', '(+49) 211 132535', 'images/restaurant4.png');

        INSERT INTO restaurants (name, address, phone, image) VALUES
            ('Im Schiffchen', 'Kaiserswerther Markt 9, Düsseldorf 40489, Germany', '(+49) 211 1489800', 'images/restaurant5.png');

        INSERT INTO restaurants (name, address, phone, image) VALUES
            ('Rubens', 'Kaiserstraße 5, Düsseldorf 40210, Germany', '(+49) 211 15859800', 'images/restaurant6.png');


        INSERT INTO restaurants (name, address, phone, image) VALUES
            ('Takumi', 'Immermannstraße 28, Düsseldorf 40210, Germany', '(+49) 211 1793308', 'images/restaurant7.png');

        INSERT INTO restaurants (name, address, phone, image) VALUES
            ('Düsseldorfer Gulaschkanone Dauser', 'Carlsplatz, Düsselodrf 40213, Germamy', '', 'images/restaurant8.png');

        INSERT INTO restaurants (name, address, phone, image) VALUES
            ('Berliner Imbiss Klemensplatz', 'Klemenspl. 9, Düsseldorf 40489, Germany', '', 'images/restaurant9.png');

        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'Phenomenal schnitzel and cucumber salad! Nice rustic but elegant vibe and very lively energy. Definitely coming back.', 1);
        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'This is an incredible local spot. Nothing too fancy, tucked away near the vibrant Carlsplatz, but with fantastic food. Fresh salads, seafood or German classics - Kontor has you covered!', 1);

        INSERT INTO reviews (rating, content, restaurant_id) VALUES (4, 'Elegant hotel in prime location, right near the Kö. Great raw seafood bar, afternoon tea, lunch and dinner. Live piano music makes this a great place for an elevated lunch or business meetings.', 2);

        INSERT INTO reviews (rating, content, restaurant_id) VALUES (3, 'The food was great. Excellent, fresh seafood, the atmosphere was emaculate. But the pricetag for fine dining will just never make sense to me.', 3);
        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'Chef Nagaya''s French-inspired interpretation of Japanese classics is incredible. The restaurant is so elegant, no frills, just sleek Japanese minimalism, that let the main star of the show - the dishes - shine. My favoirte fancy restaurant in the city.', 3);

        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'Heinemann''s truffles are simply the best I''ve ever had. The chocolate has a fantastic snap to it and the fillings are so delicious', 4);
        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'Don''t even get me started on the chocolate covered orange slices and the chocolate ginger sticks', 4);

        INSERT INTO reviews (rating, content, restaurant_id) VALUES (3, 'A bit dated and not the most inventive. Probably what you should expect from a French fine dining establishment. Still tasty and romantic, and the surrounding Kaiserswerth is beautiful.', 5);
        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'Jean-Claude Bourgueil knows what he''s doing. This feels like a portal into the past with the Baroque brick style and a classic french ambience. And yet the food remains dynamic and creative. Definitely worth a stop when you''re in Düsseldorf', 5);
        
        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'A classic Wiener Schnitzel (which must be veal btw) but make it fancy. This restaurant serves Austian classics and styles them beautifully. Elegant atmosphere but doesn''t take itself too seriously. Killer wine list too, Austrian wines are underrated.', 6);

        INSERT INTO reviews (rating, content, restaurant_id) VALUES (4, 'I have never seen Takumi without a massive line outside. And for good reason: this is maybe the best ramen I''ve had outside of Japan. Incredible spot in Düsseldorf''s Japantown on the amazing Immermanstraße. They''re always blasting great Jpop or alternative rock, and there are great spots around to get icecream or bubble tea after some banging ramen and karaage. Still, wish the wait was a bit shorter, so only 4/5.', 7);
        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'The dipping ramen are amazing. I love all the different locations that specialize in different ramen, like tantanmen or tonkotsu, but the original is still the best', 7);

        INSERT INTO reviews (rating, content, restaurant_id) VALUES (2, 'Not for me. Many better places at the Carlsplatz to stop by. I recommend a warm fishsoup from the stand right next to Gulaschkanone. Just my opinion though.', 8);
        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'This is where you see everything happening in Düsseldorf. The market is lively and filled with everything from flower stands to butchers and everything in between. People in suits and work attire scarfing down a soup on their lunch break sitting side by side wtih some roadbikers, children and retirees. Doesn''t get better than this.', 8);

        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'Currywurst is just a must when in Germany. Never misses', 9);
        INSERT INTO reviews (rating, content, restaurant_id) VALUES (5, 'Make sure to ask for the juppi sauce!', 9);
        `;
        await pool.query(insertQuery);
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();
