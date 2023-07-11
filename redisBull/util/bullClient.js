const Queue = require('bull');
const addQueue = new Queue('addition');

addQueue.add([100,5]);