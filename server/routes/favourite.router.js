const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// return all favorite recipes by the user
router.get('/',rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "recipe".id, "recipe".category, "recipe".cooktime, "recipe".description, "recipe".image_url, recipe.ingredients, recipe.makes, recipe.preparation, recipe.recipe_title, recipe.serves FROM "recipe"
    JOIN "favourites" ON "favourites".recipe_id = "recipe".id 
    WHERE "recipe".user_id = $1`;
    pool.query(queryText, [req.user.id])
    .then(result => {res.send(result.rows)})
    .catch(error => {
      console.log('Error in Favorite GET router', error);
      res.sendStatus(500);
    })
  });

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


 router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.params.id: ' + req.params.id + ' req.user.id: ' + req.user.id);
  let queryText = `DELETE FROM "favourites" WHERE( "favourites"."recipe_id"=$1 AND "favourites".user_id=$2)`;
  pool.query(queryText, [req.params.id, req.user.id]).then((result) => {
      res.sendStatus(200);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });;

});

// update given favorite with a id
router.put('/:id', (req, res) => {
    console.log('req.params.id: ' + req.params.id + ' req.user.id: ' + req.user.id);
    
    const sqlText = `
    UPDATE favorites
    SET "recipe_id" = $1;
    WHERE user_id = $2;
    `
    pool.query(sqlText, [req.params.id, req.user.id] )
      .then((result) => {
        console.log('PUT route', result);
        
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('Error in PUT', err);
        res.sendStatus(500);
      });
  
    })

 

module.exports = router;