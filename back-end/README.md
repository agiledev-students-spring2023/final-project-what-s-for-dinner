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
`npm start`
Please make sure if you run front-end first before you start the back-end server.
This will start the server at http://localhost:3000.

API Endpoints
The back-end provides the following API endpoints:

/recipes - GET
/recipes/sort-by-time - GET
/recipes/sort-by-difficulty - GET
/recipes/:id - GET
/search - GET
/random-recipe -GET
/my-ingredients - GET, POST
/search-ingredient - GET
/utensils - GET, POST

## API_KEY/Database Configuration
The back-end connects to relevant APIs and a MongoDB database. To configure the database connection, create a .env file in the root directory with the following information:
'''
MEAL_DB_API_KEY=<meal_db_api_key>
DB_HOST=<database_host>
DB_NAME=<database_name>
DB_USERNAME=<database_username>
DB_PASSWORD=<database_password>
'''
Go to "https://www.themealdb.com/" to create an account.
Replace <meal_db_api_key> with your own api key.
Replace <database_host>, <database_name>, <database_username>, and <database_password> with your actual database information.

## Unit testing
To run the test suite and generate a code coverage report using Istanbul NYC, you can use the following command:
`npx nyc mocha --exit`

## Contributing
To contribute to the back-end, please follow these steps:

- Fork the repository
- Create a new branch for your feature/fix (git checkout -b feature/your-feature-name)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push origin feature/your-feature-name)
- Create a new Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.