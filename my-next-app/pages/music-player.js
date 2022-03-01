import React, { useState } from "react";
import jsmediatags from "jsmediatags";

function getMusicInfo(Playlist, i, includeCover) {
  return new Promise((resolve, reject) => {
    new jsmediatags.Reader(Playlist[i].Src)
      .read({
        onSuccess: (tag) => {
          Playlist[i].Title = tag.tags.title;
          Playlist[i].Artist = tag.tags.artist;

          if (includeCover && !Playlist[i].Cover) {
            const data = tag.tags.picture.data;
            const format = tag.tags.picture.format;
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
              base64String += String.fromCharCode(data[i]);
            }
            Playlist[i].Cover = `url(data:${format};base64,${btoa(base64String)})`;
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
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").toggleClass("range-indicator-pause");
    $(".list-group-item.active").attr("style", "");
  } else {
    $("audio")
      .get(0)
      .pause();
    btn.value = 1;
    $(btn).html("<i class='fa fa-play'></i>");
    $(".range-indicator").toggleClass("range-indicator-pause");
    $(".list-group-item.active").attr("style", "background-color:#F44336a1");
  }
}

function clickNext(Playlist, curIdx, setCurIdx) {
  var audio = $("audio").get(0);
  curIdx = (curIdx + 1) % Playlist.length;
  getMusicInfo(Playlist, curIdx, true).then(() => {
    setCurIdx(curIdx);
    $(".carousel").carousel(curIdx);
    audio.load();
    audio.play();
    var btn = $("#play-pause").get(0);
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").toggleClass("range-indicator-pause");
    var x = String(curIdx + 1);
    var y = String(curIdx);
    let str = curIdx ? `nth-child(${y})` : "last-child()";
    $(".list-group-item:nth-child(" + x + ")").addClass("active");
    $(".list-group-item:" + str).removeClass("active");
    $(".list-group-item:" + str).attr("style", "");
  });
}

function clickPrev(Playlist, curIdx, setCurIdx) {
  var audio = $("audio").get(0);
  curIdx = (curIdx + Playlist.length - 1) % Playlist.length;
  getMusicInfo(Playlist, curIdx, true).then(() => {
    setCurIdx(curIdx);
    $(".carousel").carousel(curIdx);
    audio.load();
    audio.play();
    var btn = $("#play-pause").get(0);
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").toggleClass("range-indicator-pause");
    var x = String(curIdx + 1);
    var y = String(curIdx + 2);
    let str = Playlist.length-1-curIdx ? `nth-child(${y})` : "first-child()";
    $(".list-group-item:nth-child(" + x + ")").addClass("active");
    $(".list-group-item:" + str).removeClass("active");
    $(".list-group-item:" + str).attr("style", "");
  });
}

function clickListGroupItem(e, Playlist, curIdx, setCurIdx) {
  var audio = $("audio").get(0);
  var x = String(curIdx + 1);
  $(".list-group-item:nth-child(" + x + ")").removeClass("active");
  $(".list-group-item:nth-child(" + x + ")").attr("style", "");
  curIdx = parseInt(e.target.value);
  getMusicInfo(Playlist, curIdx, true).then(() => {
    setCurIdx(curIdx);
    var y = String(curIdx + 1);
    $(".list-group-item:nth-child(" + y + ")").addClass("active");
    $(".carousel").carousel(curIdx);
    audio.load();
    audio.play();
    var btn = $("#play-pause");
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").toggleClass("range-indicator-pause");
  });
}

const MusicPlayerFeature = ({ Playlist }) => {
  const [ curIdx, setCurIdx ] = useState(0);
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
          <div className="playlist overlay">
            <ul className="list-group">
              { Playlist.map((_, i) => {
                return <button id={`btn-${i}`} key={i} value={i} className={ i ? "list-group-item" : "list-group-item active" } onClick={ (e) => clickListGroupItem(e, Playlist, curIdx, setCurIdx) }>{`${Playlist[i].Title} - ${Playlist[i].Artist}`}</button>;
              })}
            </ul>
          </div>
          <div id="Album-carousel" className="carousel slide" data-interval="false">
            <div className="carousel-inner">
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
            <input type="range" id="inputrange" />
          </div>
          <button id="playlist-btn" value="0"><i className="fa fa-bars"></i></button>
          <button id="shuffle-btn"><i className="fa fa-random"></i></button>
          <div id="song">
            <div id="songName">{ Playlist[curIdx].Title }</div>
            <div id="artistName">{ Playlist[curIdx].Artist }</div>
          </div>
          <div id="tracktime">0/0</div>
          <div className="controls">
            <button id="prev" className="control-btn" onClick={ () => clickPrev(Playlist, curIdx, setCurIdx) }><i className="fa fa-backward"></i></button>
            <button id="play-pause" className="control-btn" value="1" onClick={ clickPlayPause }><i className="fa fa-play"></i></button>
            <button id="next" className=" control-btn" onClick={ () => clickNext(Playlist, curIdx, setCurIdx) }><i className="fa fa-forward"></i></button>
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

async function getPlaylist() {
  let Playlist = [
    { Src: "https://lucetre.vercel.app/music-player/music/1.mp3" },
    { Src: "https://lucetre.vercel.app/music-player/music/2.mp3" },
    { Src: "https://lucetre.vercel.app/music-player/music/3.mp3" },
    { Src: "https://lucetre.vercel.app/music-player/music/4.mp3" },
    { Src: "https://lucetre.vercel.app/music-player/music/5.mp3" },
    { Src: "https://lucetre.vercel.app/music-player/music/6.mp3" },
    { Src: "https://lucetre.vercel.app/music-player/music/7.mp3" },
    { Src: "https://lucetre.vercel.app/music-player/music/8.mp3" },
    { Src: "https://lucetre.vercel.app/music-player/music/9.mp3" },
  ];
  
  for (let i = 0; i < Playlist.length; i++) {
    await getMusicInfo(Playlist, i, i === 0);
  }
  return { Playlist };
}

MusicPlayerFeature.getInitialProps = getPlaylist;

export { MusicPlayerFeature, getPlaylist };
export default MusicPlayerFeature;