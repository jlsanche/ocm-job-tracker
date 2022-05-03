import { StatusCodes } from "http-status-codes";
import moment from "moment";
import auth from "../middleware/auth.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import pool from '../db/pool.js'




const createCustomer = async (req, res) => {
  const { firstName, lastName, phone, created_by } = req.body;

  const usr = req.user.user_id;
  console.log(usr)

  if ( !lastName || !firstName || !phone  || !created_by) {
    throw new BadRequestError("Please provide all values");
  }

  try {
   
    const newCustomer =  await pool.query(
      'INSERT INTO customers (customer_firstName, customer_lastName, customer_phone) VALUES ($1,$2,$3) RETURNING *',
      [ req.body.firstName, req.body.lastName, req.body.phone]
    );

  
    res.status(StatusCodes.CREATED).json({newCustomer});
    

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

const updateClient = async (req, res) => {
  const { name, lastName, email, phone, notes } = req.body;

  if (!email || !name || !lastName || !email || !phone || !notes) {
    throw new BadRequestError("Please provide all values");
  }

  const client = Client.findOne({ _id: req.client.clientId });

  client.name = name;
  client.lastName = lastName;
  client.email = email;
  client.phone = phone;

  await client.save();

  res.status(StatusCodes.OK).json({ name, lastName, email, phone });
};

const getClientList = async (req, res) => {
  const { search: client } = req.params;

  console.log("searching: " + client);

  const clientList = await Client.find({
    $or: [
      { name: { $regex: client, $options: "i" } },
      { phone: { $regex: client } },
      { lastName: { $regex: client, $options: "i" } },
    ],
  });

  res.status(StatusCodes.OK).json({ clientList });
};

const getClientsAndJobs = async (req, res) => {
  const { search, jobType, status, sort } = req.query;

  // (err, data) => {
  //   if (err) {
  //     console.log("error on regex");
  //   }

  //   const clientMap = {};
  //   data.forEach((client) => {
  //     clientMap[client._id] = client;
  //   });
  // }

  const queryObject = {};

  // if (status && status !== "all") {
  //   queryObject.status = status;
  // }

  // if (jobType && jobType !== "all") {
  //   queryObject.jobType= jobType;
  // }

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
    //queryObject.lastName = { $regex: search, $options: "i" };
  }

  const result = await Client.find(
    //   {
    //   $or: [
    //     { name: { $regex: client, $options: "i" } },
    //     { phone: { $regex: client } },
    //     { lastName: { $regex: client, $options: "i" } },
    //   ],
    // }
    queryObject
  ).populate("job");

  console.log(result);
  console.log(result[0].job[0].createdAt);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("name");
  }
  if (sort === "z-a") {
    result = result.sort("-name");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const clientsAndJobs = await result;

  const totalClientsAndJobs = await Client.countDocuments(queryObject);
  const numOfPages = Math.ceil(total / limit);

  res
    .status(StatusCodes.OK)
    .json({ clientsAndJobs, totalClientsAndJobs, numOfPages });
};

export { createCustomer, updateClient, getClientsAndJobs, getClientList };
