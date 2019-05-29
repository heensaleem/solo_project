const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/ GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    let queryText = `SELECT * FROM "recipe"`;
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
    console.log('in post', req.user)
    let queryText = 
    `INSERT INTO "recipe" ("recipe_title", "category", "makes", "serves", "cooktime", "ingredients", "description") 
     VALUES ($1, $2, $3, $4, $5, $6, $7)`; 
     pool.query(queryText, [req.body.recipe_title, req.body.category, req.user.id] )
     .then( () => {
         res.sendStatus(201); 
     }).catch (error => {
         console.log('error in post', error)
         res.sendStatus(500)
     })
         
 });
 

module.exports = router;