const musicFolder = './music/';
const fs = require('fs');

fs.readdir(musicFolder, (err, files) => {
  if (err) throw err;
  const json = JSON.stringify(files.map((file) => `/music-player/music/${file}`));
  fs.writeFile('music.json', json, 'utf8', function (err) {
    if (err) throw err;
  });
});