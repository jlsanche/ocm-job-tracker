import { StatusCodes } from "http-status-codes";
import moment from "moment";
import auth from "../middleware/auth.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import pool from "../db/pool.js";

const createCustomer = async (req, res) => {
  const { firstName, lastName, phone, created_by } = req.body;

  const usr = req.user.user_id;
  console.log(usr);

  if (!lastName || !firstName || !phone || !created_by) {
    throw new BadRequestError("Please provide all values");
  }

  try {
    const newCustomer = await pool.query(
      "INSERT INTO customers (customer_firstName, customer_lastName, customer_phone) VALUES ($1,$2,$3) RETURNING *",
      [req.body.firstName, req.body.lastName, req.body.phone]
    );

    res.status(StatusCodes.CREATED).json({ newCustomer });
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

const getCustomersList = async (req, res) => {
  try {
    const cust = await pool.query("select * from customers");

    if (cust.rowCount === 0) {
      res.status(StatusCodes.NOT_FOUND).json("No customers exists");
    }

    res.status(StatusCodes.OK).json({ cust });
  } catch (error) {
    throw new BadRequestError("Error fetching customers");
  }
};

const getCustomerSearch = async (req, res) => {
  const { customer } = req.query;

  //`/jobs?page=${page}&lastNm=${searchLastNm}&FirstNm=${searchFirstNm}&phone=${searchPhone}&sort=${sort}`
  ///customers/search?customer=${custSearch}
  try {
    if (customer) {

      const upp = customer.charAt(0).toUpperCase() + customer.slice(1);
      //const fName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      console.log('upp', upp )

      const search = await pool.query(
        `select * from customers where customer_lastname like '%'||$1||'%' or customer_firstname like '%'||$1||'%' or customer_phone like '%'||$1||'%' `,
        [upp]
      )

      if (search.rowCount === 0) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json("No customers found");
      }

      res.status(StatusCodes.OK).json({ search });

     
    }

    

  } catch (error) {

    console.log(error)

  }
};

export { createCustomer, updateClient, getCustomersList, getCustomerSearch };
