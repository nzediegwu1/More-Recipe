import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import recipes from './routes/recipes_route';
import users from './routes/users_route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve('./././template')));


app.use('/api/v1/recipes', recipes);
app.use('/api/v1/users', users);
app.use('/', (req, res) => {
    res.sendFile(path.resolve('./././template/Login.html'));
});

export default app;
