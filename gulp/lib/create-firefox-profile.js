const fs = require('fs')
const path = require('path')

module.exports = function (opts, callback) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  } else if (opts == null) {
    opts = {}
  }

  const prefs = {
    'browser.shell.checkDefaultBrowser': false
  }

  if (opts.prefs) {
    for (let key of Object.keys(opts.prefs)) {
      if (opts.prefs[key] != null) {
        prefs[key] = JSON.stringify(opts.prefs[key])
      }
    }
  }

  const profile = Object.keys(prefs)
    .reduce((acc, key) => `${acc}user_pref('${key}', ${prefs[key]});\n`, '')

  const profileFolder = opts.profile

  try {
    if (!fs.existsSync(profileFolder)){
      fs.mkdirSync(profileFolder)
    }
  } catch (err) {
    console.error(err)
  }

  fs.writeFile(path.join(profileFolder, 'user.js'), profile, (err) => {
    if (err) return callback(err)

    callback(null, profileFolder)
  })
}
