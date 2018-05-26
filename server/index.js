const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const isDev = process.env.NODE_ENV !== 'production';
const host = (process.env.HOST || 'localhost');
const port = (process.env.PORT || 3000);


const setup = isDev ? require('./setup/setupDev') : require('./setup/setupProd');
const routes = require('./routes');

/** configuration
 * 1. mongoose connection
 * 2. body-parser
 * 3. api setting
 * 4. setup for dev or prod enviroment
 * Finally Open
*/
mongoose.connect('mongodb://localhost:27017/devlogDB'); // should change

const app = express();

// body parser setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// api setting
app.use('/api', routes);

// Your api or static setting like app.use('/static', express.static(outputPath));

setup(app);
// get the intended host and port number, use localhost and port 3000 if not provided

app.listen(port, host, (err) => {
  if (err) {
    console.error(chalk.red(err));
  }
  if (isDev) {
    console.log(`Server started in Development! ${chalk.green('✓')}`);
  }
  else {
    console.log(`Server started! ${chalk.green('✓')}`);
  }

  console.log(`
      ${chalk.bold('Server is Running on:')}
      ${chalk.magenta(`http://${host}:${port}`)}
      ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
});