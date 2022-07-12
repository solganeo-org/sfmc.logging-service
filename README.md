# Logging Custom Activity
Custom Activity to log data inside a DataExtension SFMC

## Install ngrok

Install ngrok from https://ngrok.com/download (If you have a free account you will need to repeat the step 2 before run the application and change the ngrok endpoint on the package of SFMC). 

## Before Run locally

1. Create **./server/config/.env.local.json**, copy and paste the following code inside the file and replace the variables with the SFMC package credentials 😎

```json
{
    "ENV": "local",
    "CLIENT_ID": "****************qebix",
    "CLIENT_SECRET": "****************9eDU",
    "BASE_URI": "https://mcjnmn9mfnxq4m36wvmtt59plqg1.auth.marketingcloudapis.com/",
    "SFMC_DATA_EXTENSION_EXTERNAL_KEY": "1807CA86-43DB-4A4B-884C-E3AA9183F2CC",
    "SFMC_AUTH_URL": "https://mcjnmn9mfnxq4m36wvmtt59plqg1.auth.marketingcloudapis.com/v2/token",
    "PORT": 3000
}
```

2. Create **./public/config-local.json**. Copy and paste the following code and replace each endpoint (execute, publish, stop, save and validate) with the generated using ngrok. 

```json
{
    "workflowApiVersion": "1.1",
    "metaData": {
      "icon": "images/log.png",
      "category": "custom"
    },
    "type": "REST",
    "lang": {
      "en-US": {
        "name": "[Local] Logging",
        "description": "[Local] Logging Custom Activity"
      }
    },
    "arguments": {
      "execute": {
        "inArguments": [],
        "url": "https://4957-86-208-104-241.ngrok.io/sfmc/execute",
        "outArguments": [],
        "timeout": 100000,
        "retryCount": 1,
        "retryDelay": 10000,
        "concurrentRequests": 5
      }
    },
    "outcomes": [
      {
        "arguments": {
          "branchResult": "sent"
        },
        "metaData": {
          "label": "Sent"
        }
      },
      {
        "arguments": {
          "branchResult": "notsent"
        },
        "metaData": {
          "label": "Not Sent"
        }
      }
    ],
    "configurationArguments": {
      "save": {
        "url": "https://4957-86-208-104-241.ngrok.io/sfmc/save",
        "verb": "POST",
        "useJwt": true
      },
      "publish": {
        "url": "https://4957-86-208-104-241.ngrok.io/sfmc/publish",
        "verb": "POST",
        "useJwt": true
      },
      "validate": {
        "url": "https://4957-86-208-104-241.ngrok.io/sfmc/validate",
        "verb": "POST",
        "useJwt": true
      },
      "stop": {
        "url": "https://4957-86-208-104-241.ngrok.io/sfmc/stop",
        "verb": "POST",
        "useJwt": true
      }
    },
    "userInterfaces": {
      "configModal": {
        "height": 620,
        "width": 800,
        "fullscreen": false
      }
    },
    "outcomes": [
      {
        "arguments": {
          "branchResult": "sent"
        },
        "metaData": {
          "label": "Sent"
        }
      },
      {
        "arguments": {
          "branchResult": "notsent"
        },
        "metaData": {
          "label": "Not Sent"
        }
      }
    ],
    "schema": {
      "arguments": {
        "execute": {
          "inArguments": [
            {
              "phoneNumber": {
                "dataType": "Phone",
                "isNullable": false,
                "direction": "in"
              }
            },
            {
              "emailAddress": {
                "dataType": "Email",
                "isNullable": false,
                "direction": "in"
              }
            }
          ],
          "outArguments": [
            {
              "foundSignupDate": {
                "dataType": "Date",
                "direction": "out",
                "access": "visible"
              }
            }
          ]
        }
      }
    }
  }
```

3. Install dependencies `npm install`
4. Execute the application `npm run dev`
