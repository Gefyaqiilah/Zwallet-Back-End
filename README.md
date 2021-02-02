<p align="center">
<img src="https://img.shields.io/github/repo-size/Gefyaqiilah/Zwallet-Back-End?color=%20%236379f4&label=Repo%20SIZE&logo=%20%236379f4&logoColor=%20%236379f4&style=for-the-badge">
 <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.17.1-green?style=for-the-badge"></a>
 <a href="https://nodejs.org/dist/latest-v14.x/docs/api/"><img src="https://img.shields.io/badge/NodeJs-v14-lightgreen?style=for-the-badge"></a>
   <a href="https://linkedin.com/in/gefyaqiilahaqshal"><img src="https://img.shields.io/badge/LinkedIn-v4-blue?style=for-the-badge&logo=linkedin"></a>
</p>

<p align="center">
  <a href="https://github.com/Gefyaqiilah/Zwallet-Front-End">
    <img src="./screenshots/logo.png"  width="200px" alt="Logo" width="80">
  </a>

  <h3 align="center">Zwallet Back-End</h3>
  <p align="center">
    Zwallet-Backend is a backend for Zwallet application. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js.
    <br />
    <a href="https://expressjs.com/"><strong>More about Express »</strong></a>
    <br />
    <br />
    <a href="https://zwallet-gefy.netlify.app">View Demo</a>
    ·
    <a href="https://github.com/Gefyaqiilah/Zwallet-Front-End">Report Bug</a>
    ·
    <a href="https://github.com/Gefyaqiilah/Zwallet-Front-End">Request Feature</a>
  </p>

## Built With
[![Express.js](https://img.shields.io/badge/Express-4.17.1-brightgreen)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node%20Js-14.15.4-orange)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-3.1.0-blue)](https://www.npmjs.com/package/socket.io)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://www.getpostman.com/">Postman</a>
3. [Xampp](https://www.apachefriends.org/download.html)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Typ
```npm install```
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Apache and MYSQL Server using xampp, etc.
5. Create a database with the name **lonchat** then  import file **zwallet.sql** in directory root/database to [phpmyadmin](http://localhost/phpmyadmin)
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
PORT = [YOUR_SERVER_PORT]
DB_HOST = localhost
DB_NAME = zwallet
DB_USER = [YOUR_DB_USER]
DB_PASSWORD = [YOUR_DB_PASSWORD]
BASE_URL = http://localhost:[PORT]
BASE_URL_FRONT_END = [YOUR_URL_ZWALLET_FRONT_END]
ACCESS_TOKEN = [YOUR_ACCESS_TOKEN_KEY]
REFRESH_TOKEN = [YOUR_REFRESH_TOKEN_KEY]
EMAIL_USERNAME = [YOUR_EMAIL_USERNAME]
EMAIL_PASSWORD = [YOUR_EMAIL_PASSWORD]
```

## API Request Example 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2decdaacaa9676a0dc3a)
## Related Project

- [Zwallet-Frontend](https://github.com/Gefyaqiilah/Zwallet-Front-End)

<!-- CONTACT -->
## Contact

- Email - gefyaqiilah26@gmail.com
- LinkedIn - [@GefyAqiilahAqshal](https://linkedin.com/in/gefyaqiilahaqshal)
