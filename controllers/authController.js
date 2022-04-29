import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import {jwtTokens} from "../utils/jwt-helpers.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

//TODO: refactor Pool instance
import pkg from 'pg';

const { Pool} = pkg;


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
})


const register = async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;

  if (!userName || !lastName || !firstName || !password) {
    throw new BadRequestError("Please provide all values");
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser =  await pool.query(
      'INSERT INTO users (user_username, user_firstName, user_lastName, user_password) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.body.userName, req.body.firstName, req.body.lastName, hashedPassword]
    );

    const token =jwtTokens(newUser.rows[0])

    res.status(StatusCodes.CREATED).json({token, newUser});
    

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  

  if (!userName || !password) {
    throw new BadRequestError("Please provide all values");
  }


  const user = await pool.query('SELECT * FROM users WHERE user_username = $1', [userName]);

  if(user.rows.length === 0) throw new UnAuthenticatedError("Invalid credentials");

  const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].user_password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  let tokens = jwtTokens(user.rows[0]);

  res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }), httpOnly: true, sameSite: 'none', secure: true  })
  res.status(StatusCodes.OK).json({tokens, user})

};


const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  //update values
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
