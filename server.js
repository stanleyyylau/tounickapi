/**
 * Created by Stanley on 1/7/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Connect to DB first
const dbConnection = require('./config/dbConnection')();
const port = process.env.PORT;
const mode = process.env.NODE_ENV;

// Import your controllers here
const homeController = require('./controllers/home');
const bossQuizController = require('./controllers/bossQuiz');




/**
 * Create Express server.
 */
const app = express();

// Configure the app the middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Set up major routes here
app.get('/', homeController.index);
app.get('/bossquiz/:openId', bossQuizController.getScoreByOpenId);
app.post('/bossquiz/update', bossQuizController.updateScoreByOpenId);


// Error handling here
app.use((req, res) => {
  res.status(404).send('We can\' find what you\'re looking for');
})

app.use((err, req, res, next) => {
  console.error('got error')
  console.log(err)
  res.status(500).send('Something broke!')
})

/**
 * Start Express server.
 */
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port} in ${mode} mode`);
});

// Export the app for mocha to test
module.exports = app;
