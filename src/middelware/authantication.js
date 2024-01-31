// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const RESPONSE = require('../helper/response');
const db = require('../config/db.config');
const User = db.User;

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return RESPONSE.error(res, 1020, 401);
  }

  try {
    const decoded = jwt.verify(token, 'myLongAndSecureSecretKey1234@!#$%@');
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return RESPONSE.error(res, 2021, 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return RESPONSE.error(res, 2021, 401);
  }
};

module.exports = authenticateToken;
