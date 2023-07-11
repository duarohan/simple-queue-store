const express = require('express');
const celery = require("celery-node");
const config = require('./config/local.json')

const worker = celery.createWorker(config.CLOUDAMQP_URL, config.CLOUDAMQP_URL);

worker.register("tasks.add", (a, b) => a + b);
worker.register("tasks.substract", (a, b) => a - b);
worker.start();
    
const app = express();

module.exports = app;
