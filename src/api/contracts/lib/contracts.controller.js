const ContractsService = require('./Contracts.service');
const errors = require('restify-errors');
const auth = require('@bamboo/common').guards;

module.exports = {
  async createContract(req, res, next) {
    if (!auth.isAuthorized(req.headers.authorization)) {
      res.send(new errors.ForbiddenError('Unauthorized'));
      next();
    } else {
      await ContractsService.createContract(req.body.contract)
      .then(r => {
        res.send(r);
        next();
      })
      .catch(err => {
        res.send(new errors.ForbiddenError(err));
        next();
      });
    }
  },
  async getContract(req, res, next) {
    if (!auth.isAuthorized(req.headers.authorization)) {
      res.send(new errors.ForbiddenError('Unauthorized'));
    } else {
      res.send(await ContractsService.findById(req.params.id));
    }
    next();
  },
  async listContracts(req, res, next) {
    if (await !auth.isAuthorized(req.headers.authorization)) {
      res.send(new errors.ForbiddenError('Unauthorized'));
    } else {
      const token = await auth.decodeToken(req.headers.authorization);
      res.send(await ContractsService.listContracts(token._id));
    }
    next();
  },
  async updateContract(req, res, next) {
    if (await !auth.isAuthorized(req.headers.authorization)) {
      res.send(new errors.ForbiddenError('Unauthorized'));
    } else {
      res.send(
        await ContractsService.updateContract(req.params.id, req.body.contract),
      );
    }
    next();
  },
  async deleteContract(req, res, next) {
    if (await !auth.isAuthorized(req.headers.authorization)) {
      res.send(new errors.ForbiddenError('Unauthorized'));
    } else {
      await ContractsService.deleteContract(req.params.id);
      res.send('Contract deleted');
    }
    next();
  },
};
