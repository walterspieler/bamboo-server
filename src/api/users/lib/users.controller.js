const UserService = require('./users.service');
const errors = require('restify-errors');
const auth = require('@bamboo/common').guards;

module.exports = {
  async createUser(req, res, next) {
    await UserService.createUser(req.body.user, req.body.password)
      .then(r => res.send(r))
      .catch(err => res.send(400, err));
    next();
  },
  async getUser(req, res, next) {
    res.send(await UserService.findById(req.params.id));
    next();
  },
  async updateUser(req, res, next) {
    res.send(await UserService.updateUser(req.params.id, req.body.user));
    next();
  },
  async deleteUser(req, res, next) {
    if (!auth.isAdmin(req.headers.authorization)) {
      res.send(new errors.ForbiddenError('Unauthorized'));
      next();
    } else {
      await UserService.deleteUser(req.params.id);
      res.send('User deleted');
      next();
    }
  },
  async logUser(req, res, next) {
    await UserService.logUser(req.body.email, req.body.password)
      .then(r => {
        res.send(r);
        next();
      })
      .catch(err => {
        res.send(new errors.ForbiddenError(err));
        next();
      });
  },
  async logUser2FA(req, res, next) {
    await UserService.log2FA(req.params.id, req.body.otp)
      .then(r => {
        res.send(r);
        next();
      })
      .catch(err => {
        res.send(new errors.ForbiddenError(err));
        next();
      });
  },
};
