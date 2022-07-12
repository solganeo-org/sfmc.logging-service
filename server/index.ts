import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'

import sfmc from './routes/sfmc.route'
import { vars } from './config'

const app: Express = express()
const port = vars.get('PORT') || 3000

const sourceFilePath = path.join('public', 'config-' + vars.get('ENV') + '.json');
const destinationFilePath =  path.join('public', 'config.json')

console.log(vars)

// copy file
fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
  if(err) throw err;

  console.log('File: ' + sourceFilePath + ' pasted inside: ' + destinationFilePath);

})

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
  console.log(`⚡️[server]: Server is running at ${port}`)
})
