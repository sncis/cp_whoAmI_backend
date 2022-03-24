# Who Am I ? - Backend -

This project is the backend for my capstone project, which can be found [here](https://github.com/sncis/cp_whoAmI).<br />

The project aims to present the topic of privacy in a creative way.<br />

You can view the live version of the project [here](https://cpwhoami.herokuapp.com/).<br />

The website shows visitors what information a website can collect about them without using cookies, trackers or other additional technologies. It only collects data from various browser functions. 
Supported browsers are Chrome, Safari and Firefox. It may or may not work in all other browsers.<br />
 
The animation was created with [p5js](https://p5js.org/) and is integrated with a React component.<br />


The backend is connected to a MongoDB cloud database.<br />
To change the database URI, create an .env file and place your uri string there as :  
`ATLAS_URI="Your-uri-string"`


## Available Scripts

In the project directory, you can run:

### `yarn start:dev`

Runs the app in the development mode.
\
You need to specify a port. You cane eighter create a .env file and using the PORT=/your port number/ variable or add the port numner when running the app 
`PORT=5000 yarn start:dev`

It will open [http://localhost:5000](http://localhost:5000) to view it in your browser.

[nodemon](https://www.npmjs.com/package/nodemon) is used, thus the page will reload when you make changes. 


### `yarn start`

Runs the app in the development mode but without refreshing itself.


### `yarn test`

Launches the test runner.

