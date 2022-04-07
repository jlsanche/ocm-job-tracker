import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";


const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {

    console.log('inbearer')
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };  //payload is the User model obj

    console.log('I am here in token ')

    next();
  } catch (error) {
    console.log('theres an error')
    throw new UnAuthenticatedError("Authentication Invalid");
  }
}

export default auth;
