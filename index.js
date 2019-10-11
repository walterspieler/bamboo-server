const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const config = require('./config');
const APIRouter = require('./src/api/routes');

var server = restify.createServer({ ...config });

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

new APIRouter(server);

server.listen(config.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
