const fs = require('fs');
const jsmediatags = require("jsmediatags");
const iconv = require('iconv-lite');
const encoding = require('encoding-japanese');
const sharp = require('sharp');

function decodeKR(orgStr) {
  iconv.skipDecodeWarning = true;
  if (encoding.detect(orgStr) === 'EUCJP') {
    return iconv.decode(orgStr, 'euc-kr');
  }
  return Buffer.from(orgStr).toString();
}

function readMusic(file) {
  const music = { Src: file };
  return new Promise((resolve, reject) =>  {
    try {
      new jsmediatags.Reader(`${ process.cwd() }/public/music/${ file }`).read({
        onSuccess: async (tag) => {
          try {
            music.Title = decodeKR(tag.tags.title);
            music.Artist = decodeKR(tag.tags.artist);
            // if (tag.tags.lyrics && tag.tags.lyrics.lyrics) {
            //   music.Lyrics = decodeKR(tag.tags.lyrics.lyrics);
            // } else {
            //   music.Lyrics = ' ';
            // }
            // if (tag.tags.picture) {
            //   const data = tag.tags.picture.data;
            //   const format = tag.tags.picture.format;
            //   let base64String = "";
            //   for (let i = 0; i < data.length; i++) {
            //     base64String += String.fromCharCode(data[i]);
            //   }
            //   const dataUri = Buffer.from(Buffer.from(base64String, 'binary').toString('base64'), 'base64');
            //   const newUri = await sharp(dataUri).resize(300, 300).toBuffer();
            //   music.Cover = `url(data:${format};base64,${newUri.toString('base64')})`;
            // } else {
            //   music.Cover = ' ';
            // }
            resolve(music);
          } catch (e) {
            console.error(e);
            reject();
          }
        },
        onError: function(e){
          console.error(e);
          reject();
        }
      });
    } catch (e) {
      console.error(e);
      reject();
    }
  });
}

function fetchMusic(req, res) {
  const id = parseInt(req.query.id);
  return new Promise((resolve, reject) => {
    fs.readdir(`${ process.cwd() }/public/music`, async (err, files) => {
      if (err) {
        res.status(400).json(err);
        reject();
      }
      const file = files[id];
      const music = await readMusic(file).catch((e) => {
        res.status(400).json(e);
        reject();
      });
      res.status(200).json(music);
      resolve();
    });
  });
}

export default fetchMusic;