import express from 'express';
import webpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import api from './routes';

const app = express();
const port = 3000;
const devPort = 3001;

if (process.env.NODE_ENV == 'development') {
  console.log('Server is running on development env');

  const config = require('../webpack.dev.config');
  const complier = webpack(config);
  const devServer = new webpackDevServer(complier, config.devServer);
  devServer.listen(
    devPort, () => {
      console.log('webpack-dev-server is listening ' + devPort);
    }
  );
}

// Exception Handle
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Somthing Broke');
});

app.use('/', express.static(path.join(__dirname, '/../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', api);
app.get('/hello', (req, res) => {
  return res.send('Hello React Web');
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.listen(
  port, () => {
    console.log('Express is listening on port ' + port);
  }
);


/* mongodb connection */
const db = mongoose.connection;
const host = '127.0.0.1';
const dbPort = '27017';
const username = 'test';
const password = 'test';
const database = 'test';

db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongodb server');
});

mongoose.connect('mongodb://' + username + ':'+ password + '@' + host + '/' + database);
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));
