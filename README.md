# WEB-CRM-Backend

This repository is for the backend node server for the CRM Assist web version by [ProTeam GmbH](https://proteam.de).

## Application structure

    ├─ src                   # Core nodejs app files.
    ├── api                  # App routes and middlewares.
    ├─── middlewares         # Middlewares used before routes like auth.
    ├─── routes              # App routes endpoints and swagger yaml files.
    ├── config               # .Env attributes and app config keys.
    ├── interfaces           # model and data repositories interfaces.
    ├── loaders              # any internal or external service needed for starting up the application.
    ├─── depenencyInjector   # Filling `typedi` container.
    ├── models               # All entities in the application.
    ├── repositories         # Data repository for models .
    ├── services             # Business logic for application.
    ├── test                 # Testing application services.

- Link to Repo onboarding 19/04/2021: https://drive.google.com/file/d/1hpoaKL8gk2PWlRC7kz6HSbsXMZ_0jFy9/view?usp=sharing 

## Hosting the Server Locally

To host this backend server locally on your machine you will first need to clone this repository in the chosen directory. You will need to have both [npm](https://www.npmjs.com) and [node](https://nodejs.org/en) installed on your local machine. npm is automatically installed with node so you will only need to follow the node link to download and install both node and npm.
You will also need to duplicate the .env.example file to .env file in your directory and edit the MONGODB_URI parameter to the one mentioned in the MongoDB section below.
After installing node and npm and cloning the repository, you will need to go to the repository root and type the following command

```BASH
npm install
```

This command will install the required dependencies better known as 'node modules'. After the dependencies are installed you can proceed with running the following command to open a server on local machine at port 3002

```BASH
npm run dev
```

You should see a log in your terminal saying that the server is running on port 3002. You can also check that the server is up by typing the following url in your browser http:localhost:3002 . You should see any response returning from the server.
Note that the development run uses [nodemon](https://nodemon.io) which automatically triggers a new run when any of the coding files is altered.

## Deploying the Server on Heroku

Currently the server is hosted on [Heroku](https://www.heroku.com). Heroku offers a free tier for minimal usage which would be suitable for development and testing for the time being. The hosting could be moved to [Microsoft Azure](https://azure.microsoft.com) later. The Heroku is setup to respond to any push to the 'development' branch. Any push to the 'development' branch will trigger a new deployment. The server's link on Heroku is: https://proteam-webcrm-backend.herokuapp.com/

## MongoDB Setup

In this web version of ProTeam's CRM Assist [MongoDB](https://www.mongodb.com) will be used as the database for this project. For the initial setup and testing the MongoDB instances will be hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) which offers a free tier for limited and small usage volumes which would be suitable for the initial development and testing. Later, these MongoDB instances will be migrated to [Microsoft Azure](https://azure.microsoft.com) and this part will be updated to reflect any resulting changes. There is already a guide on hosting MongoDB on Microsoft Azure which could be found [here](https://www.mongodb.com/how-to-setup-mongodb-atlas-on-azure).

### Viewing and Managing the Database Cluster

To connect to the MongoDB database cluster in order to view and manage the data and the database itself, you could download [MongoDB Compass](https://www.mongodb.com/products/compass). This is a graphical user interface that offers great capabilities of handling your MongoDB database cluster and is available for download on Windows, Mac and Linux.

To connect to the database cluster through MongoDB compass you will need to login through a connection URL that includes the username and password of the user dedicated to the backend server. The connection URL is found below. You will be promted to enter the password in order to be able to connect. To obtain the password please contact @a-ghazy.

```BASH
mongodb+srv://crmBackend:<password>@proteamtest.bnz9e.azure.mongodb.net/test
```

### Connecting to the Database Cluster from Node

MongoDB team offer several drivers to connect to the MongoDB clusters in several programing languages. One of these drivers is for Node. The code to connect to the MongoDB database cluster using the Node driver could be found below.

```JavaScript
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://crmBackend:<password>@proteamtest.bnz9e.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
```

## API Documentation

The API endpoints are documented using a tool called [swagger](https://swagger.io), which allows a simple ui that documents the API endpoint as well as allowing you to try the endpoints directly from the user interface without the need to use external services. The documentation could be found in the /api-docs extension that means that it could be found locally at http://localhost:3002/api-docs or from the hosted version at https://proteam-webcrm-backend.herokuapp.com/api-docs
### Unified schema [Link](https://www.notion.so/Pro-team-API-unified-schema-6bec4a8834c34409830983d58b4f3a59)
## Testing

The server has an implemented tests to check that the code is working properly and as expected after any modification or changes. The library used for testing is the [jest](https://jestjs.io) which offers automated tests to run. The Heroku build and the github repo are programmed to run these tests before any deployment to Heroku as well as any new pull request done to this repository. You can also run the tests locally on your machine by going to the directory of the project and running the command below.

```BASH
npm run test
```
## Writing Custom scrips

The server allows admin users to create custom javascript code that will run on the server using a tool called [vm2](https://www.npmjs.com/package/vm2). This tool will run the code that is created by the admin and stored in the database. Currently there are two types of scriptting that is allowed the 'validator' type which will run when a new object of the entity is being created or an existing object is being updated and 'after-save' that will run after the object is successfully stored in the database. For this to work the scripts that are written have to follow certain guidelines for it to run properly and produce the intended result. For the 

The script will get the object that is being created in the 'customer' attribute for the customer entity and so on. and should return the result in the 'validObj.v' attribute. an example script could be found below

```JavaScript
function checkValid(obj){
  if (obj.name1 === obj.name2) {
    return true;
  }
  return 'name 1 has to be the same as name2';
}

// we'll define ext as a sandbox variable, so it will be available
validObj.v = checkValid(customer); // function call
```

The code above would return true if the object is valid in this case the object is valid if the two names are the same. If they are not the same then an error message is returned indicating the problem.
