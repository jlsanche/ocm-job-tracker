import { readFile} from 'fs/promises'

import dotenv from 'dotenv'
dotenv.config()
import connDB from './db/connect.js'
import Job from './models/Job.js'

const start = async() => { 
    try {
        await connDB(process.env.MONGO_URL)
        await Job.deleteMany()

        const jsonProds = JSON.parse(
            await readFile(new URL('./mock-data.json', import.meta.url))
        )

        await Job.create(jsonProds)
        console.log('Success!')
        process.exit(0)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
