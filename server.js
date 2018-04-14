/* eslint-disable */
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const routes = require('./routes/routes');
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://nfeibis:2k18ibis@ds249757.mlab.com:49757/nfe', {
  // mongodb://localhost:27017/mongoose_express_todos
}).then(function(){
  console.log('Database connected!');
}).catch(function(e){
  console.log(e);
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/', routes);

app.listen(port, function(){
  console.log('listening on port 3000');
});