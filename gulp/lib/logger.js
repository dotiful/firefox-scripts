/*
 * Logger class for easy and aesthetically pleasing console logging
 */

const through2    = require('through2'),
      chalk       = require("chalk"),
      cl          = console.log,
      now         = new Date().toLocaleTimeString('ru-UA', {hour12: false}),
      timestamp   = chalk.gray(`[${now}]`);

class Logger {
  static info (content, type = "info") {
    switch (type) {
      case "info": {
        return cl(`${timestamp} ${chalk.blue(type.toUpperCase())}: ${content}`);
      }
      case "warn": {
        return cl(`${timestamp} ${chalk.yellow(type.toUpperCase())}: ${content}`);
      }
      case "error": {
        return cl(`${timestamp} ${chalk.bgRed(type.toUpperCase())}: ${content}`);
      }
      case "debug": {
        return cl(`${timestamp} ${chalk.green(type.toUpperCase())}: ${JSON.stringify(content)}`);
      }
      case "cmd": {
        return cl(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())}: ${content}`);
      }
      case "ready": {
        return cl(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())}: ${content}`);
      }
      default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
    }
  }

  static watch (content, type = "changed") {
    switch (type) {
      case "changed": {
        return cl(`${timestamp} ${chalk.yellow(content)} was ${chalk.yellow.underline(type.toUpperCase())} 📂`);
      }
      case "added": {
        return cl(`${timestamp} ${chalk.green(content)} was ${chalk.green.underline(type.toUpperCase())} ➕`);
      }
      case "removed": {
        return cl(`${timestamp} ${chalk.red(content)} was ${chalk.red.underline(type.toUpperCase())} ❌`);
      }
      default: throw new TypeError("Logger type must be either changed, added or removed.");
    }
  }

  static error (content) {
    return this.info(content, "error");
  }

  static warn (content) {
    return this.info(content, "warn");
  }

  static debug (content) {
    return this.info(content, "debug");
  }

  static cmd (content) {
    return this.info(content, "cmd");
  }

  static ready (content) {
    return this.info(content, "ready");
  }
}

module.exports = Logger;

// module.exports = () => {
//   return through2.obj((file, encoding, cb) => {
//     if (file.isNull()) {
//       // nothing to do
//       return cb(null, file);
//     }

//     if (file.isStream()) {
//       // file.contents is a Stream - https://nodejs.org/api/stream.html
//       this.emit('error', new TypeError('Streams not supported!') );

//       // or, if you can handle Streams:
//       //file.contents = file.contents.pipe(...
//       //return cb(null, file);
//     } else if (file.isBuffer()) {
//       logger.debug(file.path);
//       // file.contents is a Buffer - https://nodejs.org/api/buffer.html
//       // this.emit('error', new TypeError('Buffers not supported!'));
//       // or, if you can handle Buffers:
//       cb(null, file);
//     }
//   })
// };
