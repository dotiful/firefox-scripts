const FirefoxProfilePath = require("firefox-profile-path")

// console.log(FirefoxProfilePath.os_profile_list());
// console.log(FirefoxProfilePath.os_profile_list2());

const profiles = FirefoxProfilePath.os_profile_ini()

console.log(Object.keys(profiles))

// for (let [key, value] of Object.entries(profiles)) {
//   console.log(`${key}: ${value}`);
// }

// console.log(JSON.stringify(profiles, null, '\t'));
// console.log(JSON.stringify({ uno: 1, dos: 2 }, null, '\t'));

// Object.keys(profiles).reduce((a, b) => {
//   let dir = profiles[b].Path;
//   if (/^Profile(\d+)$/.test(b) && dir) {
//     // some profile has same name, so use dir name
//     let name = path.basename(dir);
//     // if (profiles[b].IsRelative) {
//     //   dir = path.join(basedir, dir);
//     // }
//     a[name] = dir;
//   }
//   return a;
// });

// const inventory = [
//   {name: 'apples', quantity: 2},
//   {name: 'bananas', quantity: 0},
//   {name: 'cherries', quantity: 5}
// ];

// const result = inventory.find( fruit => fruit.name === 'cherries' );

// console.log(result) // { name: 'cherries', quantity: 5 }

const obj = JSON.parse(profiles);

function getMapValue(obj, key) {
   if (obj.hasOwnProperty(key))
      return obj[key];
   throw new Error("Invalid map key.");
}

// var key = "Profile3";
// var value = getMapValue(obj,key);

obj
