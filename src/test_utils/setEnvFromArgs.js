import { Command } from 'commander'
import * as dotenv from 'dotenv'

/**
 * Sets environment variables from command line arguments and returns the parsed options
 *
 * @export
 * @return {*} the parsed options
 */
export default function setEnvFromArgs() {
  dotenv.config()

  const program = new Command()
  program.option('-q, --queue <queue>', 'rabbitmq queue name', 'spot')
  program.requiredOption(
    '-u, --rabbitmq-url <host/ip>',
    'rabbitmq host name, e.g. ampq//:foo:bar@localhost:5672'
  )
  program.option('-f, --test-file <file>', 'test file path for test data')
  program.option(
    '-j, --json-string <JSON string>',
    'string of JSON for test data'
  )
  program.parse(process.argv)
  const options = program.opts()
  process.env.RABBITMQ_URL = options.rabbitmqUrl

  return options
}
