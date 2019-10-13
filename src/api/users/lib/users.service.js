const auth = require('@bamboo/common').guards;
const credential = require('credential');
const Nexmo = require('nexmo');

const User = require('./users.schema');
const env = require('../../../../env');

class UsersService {
  constructor() {
    this.nexmo = new Nexmo({
      apiKey: env.nexmo_key,
      apiSecret: env.nexmo_secret,
    });
  }

  async createUser(user, password) {
    const pw = credential();
    const hash = await pw.hash(password);
    const newUser = new User({ ...user, password: JSON.parse(hash) });
    return await new Promise((resolve, reject) => {
      newUser.save((err, u) => {
        if (err) {
          reject(err);
        }
        resolve(u);
      });
    });
  }
  async findById(id) {
    return await User.findById(id);
  }
  async updateUser(id, dto) {
    return await User.findByIdAndUpdate(id, { $set: dto });
  }
  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
  async logUser(email, password) {
    const user = await User.findOne({ email });
    if (user) {
      const pw = credential();
      const storedHash = JSON.stringify(user.password);
      return await new Promise((resolve, reject) =>
        pw.verify(storedHash, password, async (err, isValid) => {
          if (err) {
            throw err;
          }
          if (isValid) {
            await user.save();
            this.nexmo.verify.request(
              {
                number: user.phone,
                brand: 'BAMBOO',
                code_length: '4',
              },
              (err, result) => {
                if (err) {
                  reject(err);
                }
                user.OTP = result.request_id;
                resolve(user._id);
              },
            );
          } else {
            reject('Wrong Password!');
          }
        }),
      ).catch(err => {
        throw err;
      });
    } else {
      throw 'User not found!';
    }
  }
  async log2FA(id, otp) {
    const user = await User.findById(id);
    return await new Promise((resolve) => {
      this.nexmo.verify.check(
        {
          request_id: user.OTP,
          code: otp,
        },
        (err) => {
          if (err) {
            throw err;
          }
          resolve(auth.retrieveToken(user));
        },
      );
    });
  }
}
module.exports = new UsersService();
