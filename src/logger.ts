import { createLogger, format, transports } from 'winston'

const { combine, timestamp, colorize, simple, printf } = format

const logger = createLogger({
  format: combine(
    timestamp(),
    simple(),
    colorize({ level: true, message: true }),
    printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info'
    })
  ]
})

export default logger
