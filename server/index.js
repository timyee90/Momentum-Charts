const cluster = require('cluster');
const os = require('os');
const useCluster = true;

if (useCluster && cluster.isMaster) {
  const n_cpus = os.cpus().length;
  console.log(`Forking ${n_cpus} CPUS`);
  for (let i = 0; i < n_cpus; i++) {
    cluster.fork();
  }
} else {
  const express = require('express');
  const morgan = require('morgan');
  const compression = require('compression');
  const path = require('path');
  const router = require('./router.js');
  const app = express();
  const pid = process.pid;

  const port = process.env.PORT || 3000;

  app.listen(port, () =>
    console.log(`Server process: ${pid} is listening of port: ${port}`)
  );

  app.use(morgan('dev'));
  app.use(compression());
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.use(express.static(path.join(__dirname, '../client/')));
  app.use('/', router);
}
