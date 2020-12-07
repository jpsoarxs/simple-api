import jwt from 'jsonwebtoken';
import 'dotenv/config';
import helper from '../helpers/utils';

const { errorResponse } = helper;

const validateToken = (req, res, next) => {
  const token = req.headers['user-key'];
  if (!token) {
    return errorResponse(res, 401, 'AUT_01', 'Authorization code is empty', 'Bearer');
  }
  if (token.split(' ')[0] !== 'Bearer') {
    return errorResponse(res, 401, 'AUT_02', 'The userkey is invalid', 'Bearer');
  }
  const accessToken = token.split(' ')[1];
  jwt.verify(accessToken, process.env.SECRET, (err, decoded) => {
    if (err) {
      return errorResponse(res, 401, 'AUT_02', 'The userkey is invalid', 'Bearer');
    }
    req.user = decoded;
    next();
  });
};
export default validateToken;
