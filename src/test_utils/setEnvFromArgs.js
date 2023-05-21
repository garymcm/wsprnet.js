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
  program.requiredOption('-h, --rabbitmq-host <host/ip>', 'rabbitmq host name')
  program.requiredOption('-p, --rabbitmq-port <port>', 'rabbitmq port number')
  program.option('-f, --test-file <file>', 'test file path for test data')
  program.option(
    '-j, --json-string <JSON string>',
    'string of JSON for test data'
  )
  program.parse(process.argv)

  const options = program.opts()

  process.env.RABBITMQ_HOST = options.rabbitmqHost
  process.env.RABBITMQ_PORT = options.rabbitmqPort
  process.env.RABBITMQ_QUEUE = options.queue

  return options
}
