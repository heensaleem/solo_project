const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// This route *should* get all the registerd users  
router.get('/log_in', (req, res) => {
  if (req.isAuthenticated() && req.isAuthenticated()) {
      console.log('/api/user/log_in GET route');
      console.log('is authenticated?', req.isAuthenticated());
      console.log('user', req.user);
      let queryText = `SELECT * FROM "user" WHERE "id" = $1`;
      pool.query(queryText, [req.user.id]).then((result) => {
          res.send(result.rows);
      }).catch((error) => {
          console.log(error);
          res.sendStatus(500);
      });
  }else {
      //not logged in! GET OUT
      res.sendStatus(403)
  }

});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email_id = req.body.email_id;

  const queryText = 'INSERT INTO "user" (username, password, firstname, lastname, email_id) VALUES ($1, $2, $3, $4, $5) RETURNING id';
  pool.query(queryText, [username, password, firstname, lastname, email_id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
