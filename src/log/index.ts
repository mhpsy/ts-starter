import dayjs from 'dayjs'
import winston from 'winston'

const ts = dayjs().format('YYYY-MM-DD HH:mm:ss')

const logger = winston.createLogger({
  // 这里的日志级别默认为 info ，也就是只显示info和info级别以上的日志
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => {
      // 因为最长的日志级别是 verbose ，所以这里需要用 padEnd 来补齐
      return `[${info.timestamp}]-[${info.level.padEnd(7)}] ${info.message}`
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.align(),
        winston.format.printf((info) => {
          return `[${info.timestamp}]-[${info.level}] ${info.message}`
        }),
      ),
    }),
    new winston.transports.File({
      filename: `./logs/${ts}_error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `./logs/${ts}_combined.log`,
    }),
  ],
})

export default logger
