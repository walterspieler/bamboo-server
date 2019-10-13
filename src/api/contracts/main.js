const Server = require('@bamboo/common').common;
const config = require('./config');
const contractsController = require('./lib/contracts.controller');
const env = require('../../../env');
const mongoose = require('mongoose');

const userServer = new Server(config);
const routes = [
  { method: 'post', path: '/contracts', component: contractsController.createContract },
  { method: 'get', path: '/contracts', component: contractsController.listContracts },
  { method: 'get', path: '/contracts/:id', component: contractsController.getContract },
  { method: 'put', path: '/contracts/:id', component: contractsController.updateContract },
  { method: 'del', path: '/contracts/:id', component: contractsController.deleteContract },
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
