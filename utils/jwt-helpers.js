import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

const jwtTokens = ({user_id,user_firstname,user_lastname }) => {
    const user ={ user_id, user_firstname, user_lastname};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m'});

    return ({accessToken, refreshToken})
}


export  {jwtTokens}