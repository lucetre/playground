import React, { useState } from "react";
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

function getMusicInfo(Playlist, i) {
  return new Promise((resolve, reject) => {
    new jsmediatags.Reader(`${Playlist[i].Src}`)
      .read({
        onSuccess: (tag) => {
          if (!Playlist[i].Title) {
            Playlist[i].Title = decodeKR(tag.tags.title);
          }
          if (!Playlist[i].Artist) {
            Playlist[i].Artist = decodeKR(tag.tags.artist);
          }
          if (!Playlist[i].Lyrics) {
            if (tag.tags.lyrics && tag.tags.lyrics.lyrics) {
              Playlist[i].Lyrics = decodeKR(tag.tags.lyrics.lyrics);
            } else {
              Playlist[i].Lyrics = ' ';
              console.log('Lyrics N/A', i, Playlist[i].Src);
            }
          }
          if (!Playlist[i].Cover) {
            if (tag.tags.picture) {
              const data = tag.tags.picture.data;
              const format = tag.tags.picture.format;
              let base64String = "";
              for (let i = 0; i < data.length; i++) {
                base64String += String.fromCharCode(data[i]);
              }
              Playlist[i].Cover = `url(data:${format};base64,${Buffer.from(base64String, 'binary').toString('base64')}`;
            } else {
              Playlist[i].Cover = ' ';
              console.log('Cover N/A', i, Playlist[i].Src);
            }
          }
          resolve(true);
        },
        onError: (error) => {                
          reject(error);
        }
      });
  });
}

function clickPlayPause(e) {
  var btn = $("#play-pause").get(0);
  if (btn.value == 1) {
    $("audio")
      .get(0)
      .play();
    btn.value = 0;
    $(btn).html("<i style='color:#f44336' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
    $(".list-group-item.active").attr("style", "background-color:#F44336a1");
  } else {
    $("audio")
      .get(0)
      .pause();
    btn.value = 1;
    $(btn).html("<i style='color:#007bff' class='fa fa-play'></i>");
    $(".range-indicator").addClass("range-indicator-pause");
    $(".list-group-item.active").attr("style", "background-color:#007bffa1");
  }
}

function clickNext(Playlist, curIdx, setCurIdx, seed) {
  var audio = $("audio").get(0);
  curIdx = (curIdx + seed) % Playlist.length;
  getMusicInfo(Playlist, curIdx).then(() => {
    setCurIdx(curIdx);
    $(".carousel").carousel(curIdx);
    audio.load();
    audio.play();
    var btn = $("#play-pause").get(0);
    $(btn).html("<i style='color:#f44336' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
    var x = String(curIdx + 1);
    var y = String((curIdx-seed + Playlist.length) % Playlist.length + 1);
    $(".list-group-item:nth-child(" + x + ")").trigger("focus");
    $(".list-group-item:nth-child(" + x + ")").addClass("active");
    $(".list-group-item:nth-child(" + x + ")").attr("style", "background-color:#F44336a1");
    $(".list-group-item:nth-child(" + y + ")").removeClass("active");
    $(".list-group-item:nth-child(" + y + ")").attr("style", "");
  });
  const prevIdx = (curIdx-seed + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, prevIdx);
  const nextIdx = (curIdx+seed + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, nextIdx);
}

function clickPrev(Playlist, curIdx, setCurIdx, seed) {
  var audio = $("audio").get(0);
  curIdx = (curIdx + Playlist.length - seed) % Playlist.length;
  getMusicInfo(Playlist, curIdx).then(() => {
    setCurIdx(curIdx);
    $(".carousel").carousel(curIdx);
    audio.load();
    audio.play();
    var btn = $("#play-pause").get(0);
    $(btn).html("<i style='color:#f44336' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
    var x = String(curIdx + 1);
    var y = String((curIdx+seed + Playlist.length) % Playlist.length + 1);
    $(".list-group-item:nth-child(" + x + ")").trigger("focus");
    $(".list-group-item:nth-child(" + x + ")").addClass("active");
    $(".list-group-item:nth-child(" + x + ")").attr("style", "background-color:#F44336a1");
    $(".list-group-item:nth-child(" + y + ")").removeClass("active");
    $(".list-group-item:nth-child(" + y + ")").attr("style", "");
  });
  const prevIdx = (curIdx-seed + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, prevIdx);
  const nextIdx = (curIdx+seed + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, nextIdx);
}

function clickListGroupItem(e, Playlist, curIdx, setCurIdx, seed) {
  var audio = $("audio").get(0);
  var x = String(curIdx + 1);
  $(".list-group-item:nth-child(" + x + ")").removeClass("active");
  $(".list-group-item:nth-child(" + x + ")").attr("style", "");
  curIdx = parseInt(e.target.value);
  getMusicInfo(Playlist, curIdx).then(() => {
    setCurIdx(curIdx);
    var y = String(curIdx + 1);
    $(".list-group-item:nth-child(" + y + ")").addClass("active");
    $(".list-group-item:nth-child(" + y + ")").attr("style", "background-color:#F44336a1");
    $(".carousel").carousel(curIdx);
    audio.load();
    audio.play();
    var btn = $("#play-pause");
    $(btn).html("<i style='color:#f44336' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
  });
  const prevIdx = (curIdx-seed + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, prevIdx);
  const nextIdx = (curIdx+seed + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, nextIdx);
}

function clickShuffle(Playlist, curIdx, seed, setSeed) {
  var btn = $("#shuffle-btn").get(0);
  if (btn.value == 1) {
    btn.value = 0;
    $(btn).attr("style", "");
    seed = 1;
  } else {
    btn.value = 1;
    $(btn).attr("style", "color:#14b879");
    seed = Math.floor(Math.random() * Playlist.length);
  }
  setSeed(seed);
  const prevIdx = (curIdx-seed + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, prevIdx);
  const nextIdx = (curIdx+seed + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, nextIdx);
}

function clickVolumeRange(volume, setVolume, setMute) {
  setMute(false);
  volume = $('#volume-range').get(0).value;
  $('audio').get(0).volume = volume;
  setVolume(volume);
  $('#volume-range').attr("style", 'background: linear-gradient(to right, #00c87b 0%, #00c87b '+ volume*100 +'%, #d5d4d3 ' + volume*100 + '%, #d5d4d3 100%)');
}

function clickMute(mute, setMute, volume) {
  mute = !mute;
  setMute(mute);
  if (mute) {
    $('audio').get(0).volume = 0;
    $('#volume-range').attr("style", 'background: linear-gradient(to right, #d5d4d3 0%, #d5d4d3 100%)');
  } else {
    $('audio').get(0).volume = volume;
    $('#volume-range').attr("style", 'background: linear-gradient(to right, #00c87b 0%, #00c87b '+ volume*100 +'%, #d5d4d3 ' + volume*100 + '%, #d5d4d3 100%)');
  }
}

function showPlaylist() {
  hideLyrics();
  var btn = $("#playlist-btn").get(0);
  btn.value = 1;
  $("#playlist-overlay").attr("style", "height:298px");
  $(btn).html('<i class="fa fa-times">');
}

function hidePlaylist() {
  var btn = $("#playlist-btn").get(0);
  btn.value = 0;
  $("#playlist-overlay").attr("style", "");
  $(btn).html('<i class="fa fa-bars">');
}


function clickPlaylist() {
  var btn = $("#playlist-btn").get(0);
  if (btn.value == 0) {
    showPlaylist();
  } else if (btn.value == 1) {
    hidePlaylist();
  }
}

function showLyrics() {
  hidePlaylist();
  var btn = $("#lyric").get(0);
  btn.value = 1;
  $("#lyrics-overlay").attr("style", "height:298px");
}

function hideLyrics() {
  var btn = $("#lyric").get(0);
  btn.value = 0;
  $("#lyrics-overlay").attr("style", "");
}

function clickLyrics() {
  var btn = $("#lyric").get(0);
  if (btn.value == 0) {
    showLyrics();
  } else if (btn.value == 1) {
    hideLyrics();
  }
}

async function getMusicJson(url) {
  const https = process.env.NODE_ENV === 'development' ? require('http') : require('https');
  return new Promise((resolve) => {
    https.get(`${url}/music-player/music.json`, res => {
      let data = "";
      res.on('data', chunk => { data += chunk }) 
      res.on('end', () => {
        resolve(JSON.parse(data).map((src) => {
          return { Src: `${url}${src}` };
        }));
      })
    }) 
  });
}

async function getPlaylist() {
  let url = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://lucetre.vercel.app";
  const Playlist = await getMusicJson(url);
  const curIdx = 0;
  await getMusicInfo(Playlist, curIdx);
  const prevIdx = (curIdx-1 + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, prevIdx);
  const nextIdx = (curIdx+1 + Playlist.length) % Playlist.length;
  getMusicInfo(Playlist, nextIdx);
  
  return { Playlist };
}

const MusicPlayer = ({ Playlist }) => {
  const [ curIdx, setCurIdx ] = useState(0);
  const [ seed, setSeed ] = useState(1);
  const [ volume, setVolume ] = useState(0.5);
  const [ mute, setMute ] = useState(false);
  return <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css' />
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;600&amp;family=Source+Code+Pro" />
    <link rel="stylesheet" href="music-player/styles.css"></link>
    <audio>
        <source src={ Playlist[curIdx].Src } />
    </audio>
    <div className="container">
      <div className="card">
        <div className="card-img-top">
          <div id="playlist-overlay" className="overlay">
            <ul className="list-group">
              { Playlist.map((_, i) => {
                return <button id={`btn-${i}`} key={i} value={i} className={ i ? "list-group-item" : "list-group-item active" } onClick={ (e) => clickListGroupItem(e, Playlist, curIdx, setCurIdx, seed) }>{
                  `♫ ${decodeURI(Playlist[i].Src).split('.mp3')[0].split('/music/')[1]}`
                }</button>;
              })}
            </ul>
          </div>
          <div id="lyrics-overlay" className="overlay" onClick={ hideLyrics }>
            { Playlist[curIdx].Lyrics.split('\n').map((lyric, i) => <p key={i} className="song-lyrics">{lyric}</p>)  }
          </div>
          <div id="Album-carousel" className="carousel slide" data-interval="false">
            <div className="carousel-inner" onClick={ showLyrics }>
              { Playlist.map((music, i) => {
                const divStyle = {
                  backgroundImage: music.Cover,
                };
                return <div id={`music-${i+1}`} key={i} style={divStyle} className={ i ? "carousel-item" : "carousel-item active" }></div>;
              })}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div id="range">
            <div className="range-indicator range-indicator-pause">&nbsp;</div>
            <input type="range" id="play-range" />
          </div>


          <button id="playlist-btn" value="0" onClick={ clickPlaylist }><i className="fa fa-bars"></i></button>
          <button id="shuffle-btn" value="0" onClick={ () => clickShuffle(Playlist, curIdx, seed, setSeed) }><i className="fa fa-random"></i></button>
          
          
          <div id="song">
            <div id="songName">{ Playlist[curIdx].Title }</div>
          </div>

          <div id="artistName">{ Playlist[curIdx].Artist }</div>
          
          <div id="mid-controls">
            <button id="lyric" value="0" onClick={ clickLyrics }>LYRICS</button>
            
            <div id="tracktime">00:00</div>
            <div id="volume">
              <button id="mute" onClick={ () => clickMute(mute, setMute, volume) }>
                  { (mute) ? <i className="fa fa-volume-off" /> :
                  (volume < 0.2) ? <i style={{color:'#00c87b'}} className="fa fa-volume-off" /> :
                  (volume > 0.7) ? <i style={{color:'#00c87b'}} className="fa fa-volume-up" /> :
                  <i style={{ color:'#00c87b' }} className="fa fa-volume-down" /> }
              </button>
              <input id="volume-range" className="range" type="range" value={volume} step={0.05} min={0} max={1} onChange={ () => clickVolumeRange(volume, setVolume, setMute) }></input>
            </div>
          </div>
          <div className="controls">
            <button id="prev" className="control-btn" onClick={ () => clickPrev(Playlist, curIdx, setCurIdx, seed) }><i className="fa fa-backward"></i></button>
            <button id="play-pause" className="control-btn" value="1" onClick={ clickPlayPause }><i className="fa fa-play"></i></button>
            <button id="next" className=" control-btn" onClick={ () => clickNext(Playlist, curIdx, setCurIdx, seed) }><i className="fa fa-forward"></i></button>
          </div>
        </div>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js"></script>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossOrigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossOrigin="anonymous"></script>
      <script type="module" src="music-player/index.js"></script>
    </div>
  </div>;
};


MusicPlayer.getInitialProps = getPlaylist;

export { MusicPlayer, getPlaylist };
export default MusicPlayer;