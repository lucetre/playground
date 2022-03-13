import fs from 'fs';

function fetchPlaylist(req, res) {    
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(`${ process.cwd() }/public/music`, function (err, files) {
        if (err) throw err;
        res.status(200).json(files);
      });
    } catch (e) {
      reject();
      res.status(400).json(e.info);
    }
  });
}

export default fetchPlaylist;