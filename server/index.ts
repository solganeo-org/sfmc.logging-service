import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'

import sfmc from './routes/sfmc.route'
import {vars} from './config'

const app: Express = express()
const port = vars.get('PORT') || 3000

app.use(express.static('public'))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use('/sfmc', sfmc)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${port}`);
});
