import convict from 'convict'
import * as path from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
convict.addFormat(require('convict-format-with-validator').ipaddress)

const vars = convict({
  ENV: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test', 'local'],
    default: 'local',
    env: 'NODE_ENV',
  },

  CLIENT_ID: {
    doc: 'Public Key Web Push',
    format: String,
    default: '',
    env: 'CLIENT_ID',
  },

  CLIENT_SECRET: {
    doc: 'Private Key Web Push',
    format: String,
    default: '',
    env: 'CLIENT_SECRET',
  },

  BASE_URI: {
    doc: 'Base Uri to make HTTP requests',
    format: String,
    default: '',
    env: 'BASE_URI',
  },

  SFMC_DATA_EXTENSION_EXTERNAL_KEY: {
    doc: 'Log Data External Key',
    format: String,
    default: '',
    env: 'SFMC_DATA_EXTENSION_EXTERNAL_KEY',
  },

  SFMC_AUTH_URL: {
    doc: 'Auth Url',
    format: String,
    default: '',
    env: 'SFMC_AUTH_URL',
  },

  PORT: {
    doc: 'Port where the app will listen',
    format: Number,
    default: '',
    env: 'PORT',
  },
})

const env = vars.get('ENV')

if (env == 'local') {
  vars.loadFile(path.join(__dirname, '.env.' + env + '.json'))
}

// Perform validation
vars.validate({ allowed: 'strict' })
export { vars }
