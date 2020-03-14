import { createLogger, format, transports } from 'winston'

const { combine, timestamp, colorize, align, printf } = format

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp(),
    align(),
    printf(info => `${info.level} ${info.timestamp} ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info'
    })
  ]
})

export default logger
