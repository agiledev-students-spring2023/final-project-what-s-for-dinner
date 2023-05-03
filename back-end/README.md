# Back-end
This folder contains the back-end code for the project. It includes the server-side logic that handles requests from the front-end and interacts with the database.

## Technologies Used
The back-end is built using the following technologies:
- Node.js
- Express.js
- MongoDB

## Installation
To install the back-end dependencies, run the following command in the terminal:
`npm install`

## Running the Server
To start the back-end server, run the following command in the terminal:
`npm start`.
This will start the server at http://localhost:3000.

API Endpoints
The back-end provides the following API endpoints:

- POST /auth/signup: sign up a new user account
- POST /auth/login: log in to an existing user account
- POST /auth/logout: log out of an existing user account
- GET /auth/user: get the current user's information
- POST /auth/reset_password: request to reset the user's password
- PUT /auth/reset_password/:token: reset the user's password using a password reset token
- GET /recipes: get all recipes
- GET /recipes/:id: get a single recipe by ID
- POST /recipes: add a new recipe
- PUT /recipes/:id: update an existing recipe by ID
- DELETE /recipes/:id: delete an existing recipe by ID
- GET /ingredients: get all ingredients
- GET /ingredients/:id: get a single ingredient by ID
- POST /ingredients: add a new ingredient
- PUT /ingredients/:id: update an existing ingredient by ID
- DELETE /ingredients/:id: delete an existing ingredient by ID
- GET /utensils: get all utensils
- GET /utensils/:id: get a single utensil by ID
- POST /utensils: add a new utensil
- PUT /utensils/:id: update an existing utensil by ID
- DELETE /utensils/:id: delete an existing utensil by ID
- POST /share-recipes: upload a new recipe
- POST /cookie: set a cookie for the user
- GET /protected: get some protected content that requires authentication
- POST /contact-us: send a message through the contact us form.

## External APIs / Database Configuration
The back-end connects to relevant APIs and a MongoDB database. To configure the database connection, create a .env file in the root directory with the following information:
```
MEAL_DB_API_KEY=9973533
JWT_SECRET=whats.for.dinner
JWT_EXP_DAYS=60
MONGODB_URI=mongodb+srv://dinner:4s7K0Z2cQJS0LrL0@cluster0.ufkozym.mongodb.net/test?retryWrites=true&w=majority
SPOONACULAR_API_KEY=86b8ac3348974b5ab495921e201be0de
EMAIL_USERNAME=whatsfordinneragile@gmail.com
EMAIL_PASSWORD=nuzvkswprpbdvozh
CORS_ORIGIN=http://localhost:3001
```
For this project, we have provided the following credentials. However, for real projects, please visit "https://www.themealdb.com/" to create an account and replace <MEAL_DB_API_KEY> with your own API key. Similarly, replace <MONGODB_URI> and <SPOONACULAR_API_KEY> with your respective API keys.

## Unit testing
To run the test suite and generate a code coverage report using Istanbul NYC, you can use the following command:
`npm test`

## Contributing
To contribute to the back-end, please follow these steps:

- Fork the repository
- Create a new branch for your feature/fix (git checkout -b feature/your-feature-name)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push origin feature/your-feature-name)
- Create a new Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.