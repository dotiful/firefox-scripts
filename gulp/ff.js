const FirefoxProfile = require('firefox-profile');
const createProfile = require('./create-firefox-profile');
const fs = require('fs');
const path = require('path');

const ProfileFinder = new FirefoxProfile.Finder();

ProfileFinder.readProfiles(() => {
  const profilesDir = `${ProfileFinder.directory}/Profiles`;
  const newProfile = `${profilesDir}/tmp`;

  createProfile({profile: newProfile}, (err, folder) => {
    if (err) throw err;

    console.log(folder)
  })
});

// ─────────────────────────────────────────────────────────────────────────────


// console.log('AppDataPath:', AppDataPath)

// FirefoxProfile.copyFromUserProfile({name: 'test-ext-user'}, function(err, profile) {
//   console.log(profile.profileDir);
//   // profile.shouldDeleteOnExit(false);
// });


// const tempy = require('tempy')
// const fs = require('fs')
// const path = require('path')

// const prefs = {
//   'browser.shell.checkDefaultBrowser': false
// }

// if (opts.prefs) {
//   for (let key of Object.keys(opts.prefs)) {
//     if (opts.prefs[key] != null) {
//       prefs[key] = JSON.stringify(opts.prefs[key])
//     }
//   }
// }

// const profile = Object.keys(prefs)
//   .reduce((acc, key) => `${acc}user_pref('${key}', ${prefs[key]});\n`, '')

// const profileFolder = tempy.directory()

// fs.writeFile(path.join(profileFolder, 'user.js'), profile, (err) => {
//   if (err) return callback(err)

//   callback(null, profileFolder)
// })
