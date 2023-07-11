const celery = require('celery-node');
const config = require('../config/local.json')
try{
  const client = celery.createClient(config.CLOUDAMQP_URL, config.CLOUDAMQP_URL);
  const task = client.createTask('tasks.substract');
  const result = task.applyAsync([1, 2]);
  result.get().then((data) => {
    console.log(data);
    client.disconnect();
  });
  
}catch(e){
  console.log(`Error${e}`)
}


