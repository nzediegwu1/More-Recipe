import app from '../app';
import models from '../models';
import * as http from 'http';


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);


models.sequelize.sync().then(() => {
    server.listen(port);
    console.log(`Server is up @ ${port}`);
});
