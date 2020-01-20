import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './server/routes/BookRoutes';
import authorRoutes from './server/routes/AuthorRoutes';

config.config();

/**
 * init express
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT || 8080;

/**
 * API routes
 */
app.use('/api/book', bookRoutes);
app.use('/api/author', authorRoutes);

app.get('*', (req, res) =>
	res.status(200).send({message: 'Welcome to this API!'}));

app.listen(port, () =>
	console.log(`Server is running on PORT ${port}`));

export default app;