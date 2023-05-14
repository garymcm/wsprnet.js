import log4js from 'log4js'

log4js.configure({
  appenders: {
    stdout: { type: 'stdout', layout: { type: 'basic' } },
    stderr: {
      type: 'stderr',
      layout: { type: 'basic' },
    },
  },
  categories: { default: { appenders: ['stdout'], level: 'trace' } },
})

export default log4js
