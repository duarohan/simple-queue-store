const Queue = require('bull');
const cluster = require('cluster');

const numWorkers = 8;
const queue = new Queue('test concurrent queue');

if (cluster.isMaster) {
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function (worker) {
    // Let's create a few jobs for the queue workers
    for (let i = 0; i < 500; i++) {
      queue.add({ foo: 'bar' });
    };
  });

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  queue.process(function (job, jobDone) {
    console.log('Job done by worker', job.data, cluster.worker.id, job.id);
    jobDone();
  });
}