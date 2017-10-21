import app from '../app';
import models from '../models';
import * as http from 'http';
require('dotenv').config();


const port = process.env.PORT || 8080;
const server = http.createServer(app);


// models.sequelize.sync().then(() => {
server.listen(port);
console.log(`Server is up at ${port}`);
// });
