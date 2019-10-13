const Server = require('@bamboo/common').common;
const config = require('./config');
const productsController = require('./lib/products.controller');
const env = require('../../../env');
const mongoose = require('mongoose');

const userServer = new Server(config);
const routes = [
  { method: 'post', path: '/products', component: productsController.createProduct },
  { method: 'get', path: '/products', component: productsController.listProducts },
  { method: 'get', path: '/products/:id', component: productsController.getProduct },
  { method: 'put', path: '/products/:id', component: productsController.updateProduct },
  { method: 'del', path: '/products/:id', component: productsController.deleteProduct },
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
db.once('open', ()=> {});
