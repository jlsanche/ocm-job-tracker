import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import clientsRouter from './routes/clientsRoutes.js'
import 'express-async-errors'
import authenticateUser from './middleware/auth.js';
import morgan from 'morgan';
dotenv.config();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.get("/api/v1", (req, res) => {

  res.json({ msg: "foo"});
});

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/clients',authenticateUser, clientsRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => console.log(`server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

