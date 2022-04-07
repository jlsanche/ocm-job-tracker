import expressRateLimiter from "express-rate-limiter";
import { StatusCodes } from "http-status-codes";
import moment from "moment";
import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import Client from "../models/Client.js";
import Job from "../models/Job.js";

import checkPermissions from "../utils/checkPermissions.js";

const createJob = async (req, res) => {
  const { client: clientId } = req.params;
  const { jobType, notes } = req.body;

  if (!jobType) {
    throw new BadRequestError("Please provide job type!");
  }

  const client = await Client.findById(clientId);

  if (!client) {
    throw new BadRequestError("Client does not exist");
  }
  req.body.createdBy = req.user.userId;

  req.body.client = clientId;

  const job = await Job.create(req.body);
  client.job.push(job);

  client.save();

  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  // console.log('clientL', clientL)

  const queryObject = {
    createdBy: req.user.userId,
    
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.jobType = { $regex: search, $options: 'i'};
  }

  let result = Job.find(queryObject); 

  console.log('client lastname' + result)

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("client");
  }
  if (sort === "z-a") {
    result = result.sort("-client");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }

  await job.remove();

  res.status(StatusCodes.OK).json({ msg: "Job removed successfuly" });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { jobType} = req.body; //fields to update

  if (!jobType) {
    throw new BadRequestError("Please provide all values");
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }

  //console.log(typeof job.createdBy)

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  console.log(updatedJob);

  res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  console.log(stats);

  //convert to object
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;

    acc[title] = count;

    return acc;
  }, {});

  const defaultStats = {
    staged: stats.staged || 0,
    wip: stats.wip || 0,
    on_hold: stats.on_hold || 0,
    compled: stats.compled || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },

    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  console.log(monthlyApplications);

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
