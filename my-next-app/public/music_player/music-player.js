
let Playlist = [
  { Src: "music/1.mp3" },
  { Src: "music/2.mp3" },
  { Src: "music/3.mp3" },
  { Src: "music/4.mp3" },
  { Src: "music/5.mp3" },
  { Src: "music/6.mp3" },
  { Src: "music/7.mp3" },
  { Src: "music/8.mp3" },
  { Src: "music/9.mp3" },
  { Src: "music/10.mp3" },
  { Src: "music/11.mp3" },
  { Src: "music/12.mp3" },
  { Src: "music/13.mp3" },
  { Src: "music/14.mp3" },
  { Src: "music/15.mp3" },
  { Src: "music/16.mp3" },
];

function fetchMusic(n, file) {
  const jsmediatags = window.jsmediatags;
  jsmediatags.read(`${window.location.protocol}//${window.location.host}/music_player/${file}`, {
    onSuccess: function(tag) { 
      // Array buffer to base64
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";
      for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
      }
      const cover = `url(data:${format};base64,${window.btoa(base64String)})`;
      const title = tag.tags.title;
      const artist = tag.tags.artist;
      const album = tag.tags.album;
      const genre = tag.tags.genre;
      document.querySelector(`#music-${n}`).style.backgroundImage = cover;
      $(`#btn-${n-1}`).html(`${title} - ${artist}`);
      
      if (n == 1) {
        $("#songName").html(title);
        $("#artistName").html(artist);
        $(".list-group-item:nth-child(1)").addClass("active");
      }
      Playlist[n-1]['Cover'] = cover;
      Playlist[n-1]['Song'] = title;
      Playlist[n-1]['Artist'] = artist;
      Playlist[n-1]['Album'] = album;
      Playlist[n-1]['Genre'] = genre;
    },
    onError: function(error) {
      throw new Error(error);
    }
  });
}

$(document).ready(function() {
  var i = 0;

  for (let j = 0; j < Playlist.length; j++) { 
    if (j == 0) {
      $('.carousel-inner').append(`<div id='music-${j+1}' class="carousel-item active"></div>`);
    }
    else {
      $('.carousel-inner').append(`<div id='music-${j+1}' class="carousel-item"></div>`); 
    }
    $('.list-group').append(`<button id="btn-${j}" value=${j} class="list-group-item"></button>`);
    fetchMusic(j+1, Playlist[j]['Src']);
  }
  $("source").attr("src", Playlist[i]["Src"]);

  $(".carousel").carousel({
    interval: false
  });

  var audio = $("audio").get(0);
  audio.load();

  $("#play-pause").on("click", function() {
    if (this.value == 1) {
      $("audio")
        .get(0)
        .play();
      this.value = 0;
      $(this).html("<i style='color:#007bff' class='fa fa-pause'></i>");
      $(".range-indicator").toggleClass("range-indicator-pause");
      $(".list-group-item.active").attr("style", "");
    } else {
      $("audio")
        .get(0)
        .pause();
      this.value = 1;
      $(this).html("<i class='fa fa-play'></i>");
      $(".range-indicator").addClass("range-indicator-pause");
      $(".list-group-item.active").attr("style", "background-color:#F44336a1");
    }
  });

  $("#next").on("click", function() {
    i++;
    if (i == Playlist.length) i = 0;
    $(".carousel").carousel(i);
    $("source").attr("src", Playlist[i]["Src"]);
    audio.load();
    audio.play();
    $("#songName").html(Playlist[i]["Song"]);
    $("#artistName").html(Playlist[i]["Artist"]);
    var btn = $("#play-pause");
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
    $(".artist-name").html(Playlist[i]["Artist"]);
    var x = String(parseInt(i) + 1);
    var y = String(parseInt(x) - 1);
    let str = `nth-child(${y})`;
    if (x == 1) str = "last-child()";
    $(".list-group-item:nth-child(" + x + ")").addClass("active");
    $(".list-group-item:" + str).removeClass("active");
    $(".list-group-item:" + str).attr("style", "");
  });

  $("#prev").on("click", function() {
    i--;
    if (i == -1) {
      i = Playlist.length - 1;
    }
    $(".carousel").carousel(i);
    $("source").attr("src", Playlist[i]["Src"]);
    audio.load();
    audio.play();
    $("#songName").html(Playlist[i]["Song"]);
    $("#artistName").html(Playlist[i]["Artist"]);
    var btn = $("#play-pause");
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
    $(".artist-name").html(Playlist[i]["Artist"]);
    var x = String(parseInt(i) + 1);
    var y = String(parseInt(x) + 1);
    let str = `nth-child(${y})`;
    if (x == Playlist.length + 1) str = "nth-child(1)";
    $(".list-group-item:nth-child(" + x + ")").addClass("active");
    $(".list-group-item:" + str).removeClass("active");
    $(".list-group-item:" + str).attr("style", "");
  });

  audio.addEventListener("timeupdate", function() {
    var cmin = Math.floor(this.currentTime / 60);
    if (cmin < 10) cmin = "0" + cmin;
    var csec = Math.floor(this.currentTime) % 60;
    if (csec < 10) csec = "0" + csec;
    var dmin = Math.floor(this.duration / 60);
    if (dmin < 10) dmin = "0" + dmin;
    var dsec = Math.floor(this.duration) % 60;
    if (dsec < 10) dsec = "0" + dsec;
    $("#tracktime").html(cmin + ":" + csec + " / " + dmin + ":" + dsec);
    $(".range-indicator").attr(
      "style",
      "width:" +
        Math.floor(this.currentTime) / Math.floor(this.duration) * 100 +
        "%"
    );

    if (this.currentTime == this.duration) {
      $("#next").trigger("click");
    }
  });

  $("#inputrange").attr("max", Math.floor($("audio").get(0).duration));

  $("#inputrange").on("click", function() {
    $("audio").get(0).currentTime =
      this.value * $("audio").get(0).duration / 100;
  });

  $(window).keypress(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      $("#play-pause").trigger("click");
    }
  });

  $(".list-group-item").on("click", function() {
    var x = String(parseInt(i) + 1);
    $(".list-group-item:nth-child(" + x + ")").removeClass("active");
    $(".list-group-item:nth-child(" + x + ")").attr("style", "");
    i = this.value;
    var x1 = String(parseInt(i) + 1);
    $(".list-group-item:nth-child(" + x1 + ")").addClass("active");
    $(".carousel").carousel(parseInt(i));
    $("source").attr("src", Playlist[i]["Src"]);
    audio.load();
    audio.play();
    $("#songName").html(Playlist[i]["Song"]);
    $("#artistName").html(Playlist[i]["Artist"]);
    var btn = $("#play-pause");
    $(btn).html("<i style='color:#007bff' class='fa fa-pause'></i>");
    $(".range-indicator").removeClass("range-indicator-pause");
    $(".artist-name").html(Playlist[i]["Artist"]);
  });

  $("#playlist-btn").on("click", function() {
    if (this.value == 0) {
      $(".playlist").attr("style", "height:298px");
      this.value = 1;
      $(this).html('<i class="fa fa-times">');
    } else if (this.value == 1) {
      $(".playlist").attr("style", "");
      this.value = 0;
      $(this).html('<i class="fa fa-bars">');
    }
  });
});