const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const corsMiddleware = require('restify-cors-middleware');

class BambooServer {
  constructor(config) {
    this.config = config;
    const cors = corsMiddleware({
      preflightMaxAge: 5, //Optional
      origins: ['*'],
      allowHeaders: ['Authorization'],
      exposeHeaders: ['API-Token-Expiry']
    });
    this.server = restify.createServer(config);
    this.server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
    this.server.use(restifyPlugins.acceptParser(this.server.acceptable));
    this.server.use(restifyPlugins.queryParser({ mapParams: true }));
    this.server.use(restifyPlugins.fullResponse());

    this.server.pre(cors.preflight);
    this.server.use(cors.actual);
  }
  run() {
    return this.server.listen(this.config.port, () => {
      console.log('%s listening at %s', this.server.name, this.server.url);
    });
  }

  addRoutes(routes) {
    routes.forEach(route => {
      this._addRoute(route.method, route.path, route.component);
    });
  }

  //PRIVATE METHOD;
  _addRoute(method, path, component) {
    return this.server[method](path, component);
  }
}
module.exports = BambooServer;