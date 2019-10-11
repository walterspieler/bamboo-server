function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

class APIRouter {
  constructor(server) {
    server.get('/hello/:name', respond);
    server.head('/hello/:name', respond);
  }
}

module.exports = APIRouter;
