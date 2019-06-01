const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/ GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    let queryText = `SELECT * FROM "recipe";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
/**
 * Add recipes for the logged in user 
 */

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in post recipe', req.user)
    let queryText = 
    `INSERT INTO "recipe" ("user_id", "recipe_title", "category", "description", "makes", "serves", "cooktime", "ingredients", "preparation", "image_url") 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`; 
     pool.query(queryText, [req.user.id, req.body.recipe_title, req.body.category, req.body.description, req.body.makes, req.body.serves, req.body.cooktime, req.body.ingredients, req.body.preparation, req.body.image_url] )
     .then( () => {
         res.sendStatus(201); 
     }).catch (error => {
         console.log('error in post recipe router', error)
         res.sendStatus(500)
     })
         
 });
 

module.exports = router;