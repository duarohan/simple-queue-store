const express = require('express');
const Queue = require('bull');
const addQueue = new Queue('addition');

addQueue.process(async (job) => {
    const [a,b] =  job.data
    const sum = a+b
    return sum
  });

const app = express();
module.exports = app;
