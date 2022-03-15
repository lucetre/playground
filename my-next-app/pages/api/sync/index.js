import fs from 'fs';

async function syncMusic(req, res) {
  let resp = await fetch(`http://localhost:3000/api/playlist`);
  let playlist = await resp.json();
  
  const total = playlist.length;
  let newTitle = '';
  playlist = [];
  for (let i = 0; i < total; i++) {
    try {
      const resp  = await fetch(`http://localhost:3000/api/playlist/${i}`)
      .catch((error) => {
        console.log(i, error);
        throw error;
      });
      const music = await resp.json();
      if (!music.Artist || !music.Title) {
        throw new Error('Not found artist or title.');
      }
      const artist = music.Artist.replace(/[/\\?%*:|"<>]/g, '_').replaceAll('-', '_');
      const title = music.Title.replace(/[/\\?%*:|"<>]/g, '_').replaceAll('-', '_');
      newTitle = `${ artist } - ${ title }.mp3`;
      const sepCnt = (newTitle.match(/-/g)||[]).length;
      
      if (sepCnt !== 1) {
        throw new Error('Found separators more than one.');
      }

      fs.copyFileSync(`${ process.cwd() }/public/music/${ music.Src }`,
                      `${ process.cwd() }/public/valid/${ newTitle }`,
                      fs.constants.COPYFILE_EXCL);

      playlist.push(newTitle);
      console.log(i, newTitle);
    } catch (e) {
      console.log(i, newTitle, e);
    }
  } 

  res.status(200).json({ total, length: playlist.length, playlist });
}

export default syncMusic;