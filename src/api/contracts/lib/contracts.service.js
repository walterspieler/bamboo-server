const Contract = require('./contracts.schema');

class ContractsService {
  async createContract(contract) {
    const newContract = new Contract({ ...contract });
    return await new Promise((resolve, reject) => {
      newContract.save((err, u) => {
        if (err) {
          reject(err);
        }
        resolve(u);
      });
    }).catch(err=> {throw(err)});
  }

  async findById(id) {
    return await Contract.findById(id);
  }

  async listContracts(owner_id) {
    return await Contract.find({owner_id});
  }

  async updateContract(id, dto) {
    return await Contract.findByIdAndUpdate(id, { $set: dto });
  }

  async deleteContract(id) {
    return await Contract.findByIdAndDelete(id);
  }

}
module.exports = new ContractsService();
