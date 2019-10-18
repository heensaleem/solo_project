# Zaika Recipes

Zaika(Sense of Taste) is a web application for Recipes. Registration grants users a customizable profile page and ability to add, view, update, and delete recipes. A user can also add recipes to their favourites page. And can also be able to search the recipes through their category type.

## Built With
Zaika Recipes was built with React, Redux Sagas, Node, Express, and PostgreSQL. It also uses Material-UI for styling and Nodemailer for sending emails.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
- Node.js
- PostgresQL
- Postico

## Installing
- Steps to get the development environment running.

### Download this project.
- Set up a local PostgreSQL database called prime_app
- Use the data.sql instructions to create a table in your database
- Set up a local .env file with the following fields, replacing values with your own: a. SERVER_SESSION_SECRET=(32-character string including symbols) b. email_user=(gmail account to send messages from) 
- In the terminal, npm install in the project folder
- In the terminal, npm run server and npm run client

## Screen Shot
<img width="1274" alt="Screen Shot 2019-06-14 at 10 40 22 PM" src="https://user-images.githubusercontent.com/47267211/59546579-a6ea1080-8ef5-11e9-9d4f-83ca2361fc01.png">


## Documentation
### Completed Features
- App allows users to

 - Create an account and sign in
 - View all recipes in the home page created by the users
 - Able to filter through category and search for the recipe
 - Add Recipes page to add a recipe
 - Able to review the recipe once added
 - once added sends an email to all the users
 - Favourites Page that shows all the favourites recipes of that logged in user
 - Profile Page shows all the recipes that are added by that user
 
## Next Steps
 - Allow user to add comments and reviews.
 - Get API for the trending recipes.
 - Deploy to Heroku.
 
## Authors
Heena Kouser


    

