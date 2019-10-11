module.exports = function(server) {
  server.get('/hello2/:name', respond);
  server.head('/hello2/:name', respond);
};
