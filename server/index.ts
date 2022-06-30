import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'

import sfmc from './routes/sfmc'


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'))
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${port}`);
});