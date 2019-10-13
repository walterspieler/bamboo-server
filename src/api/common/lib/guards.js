const jwt = require('jsonwebtoken');
const env = require('../../../../env');

class AuthGuard {
  async isAuthorized(authHeader) {
    if (!authHeader) {
      return false;
    }
    const token = authHeader.replace('Bearer ', '').trim();
    new Promise(resolve => {
      jwt.verify(token, env.jwt_secret, (err, decoded) => {
        if (err) {
          return resolve(false);
        }
        return resolve(true);
      });
    });
  }
  retrieveToken(user) {
    return jwt.sign(
      {
        email: user.email,
        phone: user.phone,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        _id: user._id,
      },
      env.jwt_secret,
    );
  }
  async decodeToken(authHeader) {
    const token = authHeader.replace('Bearer ', '').trim();
    const decoded = await jwt.decode(token);
    return decoded;
  }
  async isAdmin(authHeader) {
    if (!authHeader) {
      return false;
    }
    const token = authHeader.replace('Bearer ', '').trim();
    const decoded = await jwt.decode(token);
    return decoded.role === 'admin';
  }
}
module.exports = new AuthGuard();
