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

  PUBLIC_KEY: {
    doc: 'Public Key Web Push',
    format: String,
    default: '',
    env: 'PUBLIC_KEY',
  },

  PRIVATE_KEY: {
    doc: 'Private Key Web Push',
    format: String,
    default: '',
    env: 'PRIVATE_KEY',
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
