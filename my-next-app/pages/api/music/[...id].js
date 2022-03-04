import jsmediatags from "jsmediatags";
import iconv from 'iconv-lite';
import encoding from 'encoding-japanese';
 
function decodeKR(orgStr) {
  iconv.skipDecodeWarning = true;
  if (encoding.detect(orgStr) === 'EUCJP') {
    return iconv.decode(orgStr, 'euc-kr');
  }
  return Buffer.from(orgStr).toString();
}

export default async (req, res) => {
  return new Promise(async (resolve, reject) =>  {
    try {
      const id = parseInt(req.query.id);
      let url = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://lucetre.vercel.app";
      const music = await fetch(`${url}/api/playlist/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
      }).then((resp) => resp.json());

      if (!music.Src) {
        throw new Error("No such id in the playlist.");
      }

      new jsmediatags.Reader(`${url}${music.Src}`).read({
        onSuccess: (tag) => {
          music.Title = decodeKR(tag.tags.title);
          music.Artist = decodeKR(tag.tags.artist);
          if (tag.tags.lyrics && tag.tags.lyrics.lyrics) {
            music.Lyrics = decodeKR(tag.tags.lyrics.lyrics);
          } else {
            music.Lyrics = ' ';
          }
          if (tag.tags.picture) {
            const data = tag.tags.picture.data;
            const format = tag.tags.picture.format;
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
              base64String += String.fromCharCode(data[i]);
            }
            music.Cover = `url(data:${format};base64,${Buffer.from(base64String, 'binary').toString('base64')}`;
          } else {
            music.Cover = ' ';
          }
          res.status(200).json(music);
          resolve();
        },
        onError: function(err){
          res.status(400).json(err);
          reject();
        }
      });
    } catch (err) {
      res.status(400).json(err);
      reject();
    }
  });
    
}