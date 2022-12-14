import express from 'express';
import router from '../routes/main';
import handleError from '../middleware/error';
import notFound from '../middleware/notFound';

const app = express();

app.use(express.static('public'));

app.use('/api', router);

app.use(handleError);

app.use(notFound);

export default app;
