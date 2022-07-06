// eslint-disable-next-line @typescript-eslint/no-var-requires
const FuelSoap = require('fuel-soap');

import { vars, LogData} from '../config'
import {v4 as uuidv4} from 'uuid';

function insertLog(logData: LogData): void {

    const options = {
        auth: {
            clientId: vars.get('CLIENT_ID'),
            clientSecret: vars.get('CLIENT_SECRET'),
            authVersion: 2,
            authUrl:  vars.get('SFMC_AUTH_URL'),
            authOptions:{
                authVersion: 2
            }
        }
        , soapEndpoint: vars.get('BASE_URI')
    };

    const client = new FuelSoap(options);   
    
    const co = {
        "CustomerKey": vars.get('SFMC_DATA_EXTENSION_EXTERNAL_KEY'),
        "Keys":[{"Key":{"Name":"ID","Value":uuidv4()}}],
        "Properties":[
            {"Property":
                    [
                        {"Name":"SubscriberKey","Value":logData.subscriberKey},
                        {"Name":"ContactKey","Value":logData.journeyId},
                        {"Name":"JourneyId","Value":logData.journeyId},
                        {"Name":"VersionId","Value":logData.versionId},
                        {"Name":"VersionNumber","Value":logData.versionNumber},
                        {"Name":"JourneyName","Value":logData.journeyName},
                        {"Name":"LogName","Value":logData.logName},
                        {"Name":"LogDescription","Value":logData.logDescription},
                        {"Name":"LogDate","Value":logData.logDate.toISOString()}

                    ]
            }
        ]
    };

    const uo = {
        SaveOptions: [{ "SaveOption": { PropertyName: "DataExtensionObject", SaveAction: "UpdateAdd" } }]
    };

    client.update('DataExtensionObject',co,uo, function(err: Error, response: any){
        
        if(err) console.log(err)

        console.log(response.body)

    });

}

export {insertLog};

