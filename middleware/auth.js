import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";


const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {

    throw new UnAuthenticatedError("Authentication Invalid");
  }

    const token = authHeader.split(' ')[1];
  

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) =>{
      if(error) return res.status(401).json({ error: error.message})
      req.user = user;
      next();
    });

    console.log('jwt !!!!!!')
  
}

export default auth;
