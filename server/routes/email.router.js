const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
require('dotenv').config();

//email 
const nodemailer = require('nodemailer');

const transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.email_user,
        pass: process.env.email_pass
    }
}

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.get('/getemails', (req, res) => {
    const queryText = `SELECT array_agg("user".email_id) AS "email" FROM "user"`;
    pool.query(queryText)
    .then(result => {res.send(result.rows)})
    .catch(error => {
      console.log('Error in Favorite GET router', error);
      res.sendStatus(500);
    })
  });

router.post('/send', (req, res) => {
     const name = `${req.user.firstname} ${req.user.lastname}`;
    // const sendEmail = req.user.username;
    // const message = req.body.message
    const content = `Checkout the new recipe by ${req.user.username} `
    console.log('req.body in post email', req.body);
    const mail = {
         from: name,
         to: req.body,  //Change to email address that you want to receive messages on
         subject: "Hey, User",
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
}); //end POST route

module.exports = router;