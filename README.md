## Project Description

"What's for Dinner" is an open-source web application that suggests recipes based on the ingredients and cooking utensils you have on hand. With our platform, you can search for recipes using specific ingredients, add or remove ingredients to see different recipe suggestions, and save your favorite recipes for future use. Our app also includes advanced search filters such as dietary restrictions, meal type, and cooking time/difficulty to help find the perfect recipe for users at all levels.

### Product Vision Statement

"What's for Dinner" is an app that helps users save time, reduce food waste, and enjoy the cooking process by providing optimal recipe suggestions based on the ingredients available.

## Meet Our Team

Abhi - [link to github](https://github.com/abhi-vachani)

Nancy - [link to github](https://github.com/nancysun0415)

Alex - [link to github](https://github.com/ak8000)

Chenyi - [link to github](https://github.com/Ginette9)

Hillary - [link to github](https://github.com/hillarydavis1)

## History of the Project

We are a team of college students, and often after grocery shopping we have a few leftover ingredients that we don't know how to use or use effectively. Therefore, having an application that can help with giving us an optimal recipe based on the available ingredients can be very helpful in saving time, producing less waste when cooking, and enjopying the process.

Please refer to the [CONTRIBUTING.md](https://github.com/agiledev-students-spring-2023/final-project-what-s-for-dinner/blob/master/CONTRIBUTING.md) file for guidelines on how to contribute to the project.

## Instructions to Building and Testing the Project

### Building
**Front-end**
1. run `cd front-end` to navigate to front-end folder
2. first run `npm install --legacy-peer-deps` (please ignore the error for now)
**Back-end**
1. run `cd back-end` to navigate to back-end folder
2. run `npm install`
3. create a `.env` file in the back-end directory with the following information:
    > MEAL_DB_API_KEY=9973533
    > JWT_SECRET=whats.for.dinner
    > JWT_EXP_DAYS=60
    > MONGODB_URI=mongodb+srv://cx2054:GKxpFW1aGNchzgZK@whatsfordinner.xapp6ti.mongodb.net/?retryWrites=true&w=majority
    > EMAIL_USERNAME=whatsfordinneragile@gmail.com
    > EMAIL_PASSWORD=nuzvkswprpbdvozh
    
    *Note: You should go to "https://www.themealdb.com/" to create your own account and replace the value with your own api key. But for demonstrantion simplicity we provide you with the api key for now.*

### Running
1. if you are only running the front-end or back-end for testing purpose, you can simply run `npm start` in the corresponding front-end/back-end folder
2. if you are running both front-end and back-end, please first run `npm start` in front-end folder and then in back-end folder, this will run both front-end and back-end on port 3000 

*Note: some of our pages won't work properly if you run back-end on port 3000 and front-end on port 3001*
3. now you can open [http://localhost:3000](http://localhost:3000) in your browser to view our app.

## Additional Resources
[README.md](https://github.com/agiledev-students-spring-2023/final-project-what-s-for-dinner/blob/master/README.md) - an overview of this project<br>
[LICENSE.md](https://github.com/agiledev-students-spring-2023/final-project-what-s-for-dinner/blob/master/LICENSE.md) - the license under which this project is released<br>
[UX-DESIGN.md](https://github.com/agiledev-students-spring-2023/final-project-what-s-for-dinner/blob/master/UX-DESIGN.md) - the wireframe diagrams and prototype for this project

### Important Note:
This project is still in development, and we appreciate your patience and feedback as we work to improve the platform. If you have any questions or suggestions, please don't hesitate to reach out to us via the project's GitHub page.