import { Request, Response } from 'express'
import { LogData } from '../config'

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

  const contactId: string = args.contactId;
  const publicationId: string = args.publicationId;
  const dataExtensionName: string = args.UIDEName;

  const subscriberKey: string = req.body.keyValue;
  const journeyId: string = req.body.journeyId;
  const versionId: string = "Version ID (?)"
  const versionNumber: string = args.journeyVersion;
  const journeyName: string = "TEST NAME";
  const logName: string = args.UILogName;
  const logDescription: string  = args.UILogDescription;
  const logDate: Date = new Date();

  const logData: LogData = {

    subscriberKey,
    journeyId,
    versionId,
    versionNumber,
    journeyName,
    logName,
    logDescription,
    logDate

  }

  console.log(logData)

  res.status(200).send('Execute')
}

export default { save, publish, validate, execute, stop }
