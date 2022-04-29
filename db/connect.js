import pkg from 'pg';

const { Pool} = pkg;

import dotenv from 'dotenv';
import { query } from 'express';
dotenv.config()

const connectDB = (url) => {

   
    const connectionString = url;

    const pool = new Pool({
        connectionString,
    })


    pool.connect( function(err) {
        if(err)
        {
            return console.log('Could not connect to postgres', err);
        }

        pool.query('SELECT NOW() AS "theTime"', function(err, res) {
            if(err)
            {
                return console.log('error running query', err)
            }

            console.log(res.rows[0].theTime);

            

            pool.end()
        })
  

    })
}

const pool = () => {

    const connectionString = process.env.DATABASE_URL;

    const pool = new Pool({
        connectionString,
    })

    const balls = {query: (text, params) => pool.query(text, params)}

    return balls

}





export { connectDB, pool}