const Server = require('@bamboo/common').common;
const config = require('./config');
const user = require('./lib/users.controller');
const env = require('../../../env');
const mongoose = require('mongoose');

const userServer = new Server(config);
const routes = [
  { method: 'post', path: '/users/login/:id', component: user.logUser2FA },
  { method: 'post', path: '/users/login', component: user.logUser },
  { method: 'post', path: '/users', component: user.createUser },
  { method: 'get', path: '/users/:id', component: user.getUser },
  { method: 'put', path: '/users/:id', component: user.updateUser },
  { method: 'del', path: '/users/:id', component: user.deleteUser },
];
userServer.run();
userServer.addRoutes(routes);
const uri = `mongodb+srv://bamboo-admin:${env.password}@bamboo-mongo-keush.mongodb.net/bamboo-dev`;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{});
