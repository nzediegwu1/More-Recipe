import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import recipes from './routes/recipesRoute';
import users from './routes/usersRoute';
import votes from './routes/votesRoute';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./././template')));


app.use('/api/v1/recipes', recipes);
app.use('/api/v1/users', users);
app.use('/api/v1/votes', votes);
app.use('/', (req, res) => {
    res.sendFile(path.resolve('./././template/Login.html'));
});

export default app;
