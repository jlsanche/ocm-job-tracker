import pkg from 'pg';

const { Pool} = pkg;

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




export default connectDB