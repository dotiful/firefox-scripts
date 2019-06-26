const FirefoxProfile = require('firefox-profile');
const fs = require('fs')
const path = require('path')

const prefs = {
  'browser.shell.checkDefaultBrowser': false
}

const profile = Object.keys(prefs)
  .reduce((acc, key) => `${acc}user_pref('${key}', ${prefs[key]});\n`, '')

const profileFolder = tempy.directory()

fs.writeFile(path.join(profileFolder, 'user.js'), profile, (err) => {
  if (err) console.error('err is ', err);

  console.log('profileFolder:', profileFolder)
});

