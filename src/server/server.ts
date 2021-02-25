import { Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
//favicon = require('serve-favicon'),
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('server is ok');
});

app.listen(3005, () => {
  console.log('listening on 3005');
});

export default app;
