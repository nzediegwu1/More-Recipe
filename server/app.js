import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import recipes from './routes/recipes.js';
// import users from './routes/users';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/recipes', recipes);

export default app;
