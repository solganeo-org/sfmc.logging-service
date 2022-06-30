import { Request, Response } from 'express'

function save(req: Request, res: Response) {
  console.log('Saving ...')

  res.status(200).send('Save')
}

function publish(req: Request, res: Response) {
  console.log('Publishing ...')

  res.status(200).send('Publish')
}

function validate(req: Request, res: Response) {
  console.log('Validating ...')

  res.status(200).send('Validate')
}

function stop(req: Request, res: Response) {
  console.log('Stopping ...')

  res.status(200).send('Stop')
}

function execute(req: Request, res: Response) {
  console.log('Executing ...')

  const args: any = req.body.inArguments[0]

  res.status(200).send('Execute')
}

export default { save, publish, validate, execute, stop }