const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');




/**
 * POST route template
 */
/**
 * Add favourite recipes for the logged in user 
 */

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in post  fav recipe', req.user)
    let queryText = 
    `INSERT INTO "favourites" ("user_id", "recipe_id")
    VALUES ($1, $2)`; 
     pool.query(queryText, [req.user.id, req.body.recipe_id] )
     .then( () => {
         res.sendStatus(201); 
     }).catch (error => {
         console.log('error in post favourites router', error)
         res.sendStatus(500)
     })
         
 });
 

module.exports = router;