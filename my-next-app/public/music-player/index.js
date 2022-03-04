
$(document).ready(function() {
  var audio = $("audio").get(0);
  audio.volume = 0.5;
  audio.load();
  $("#play-pause").html("<i style='color:#007bff' class='fa fa-play'></i>");
  $('#volume-range').attr("style", 'background: linear-gradient(to right, #00c87b 0%, #00c87b 50%, #d5d4d3 50%, #d5d4d3 100%)');

  audio.addEventListener("timeupdate", function() {
    if (this.currentTime && this.duration) {
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
    }
  });

  $("#play-range").attr("max", Math.floor($("audio").get(0).duration));

  $("#play-range").on("click", function() {
    $("audio").get(0).currentTime =
      this.value * $("audio").get(0).duration / 100;
  });

  $(window).keypress(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      $("#play-pause").trigger("click");
    }
  });

  $(window).mousemove(function(e) {
    let playlist = $("#playlist-overlay");
    let lyrics = $("#lyrics-overlay");
    let distance = playlist.offset().left + playlist.width() - e.pageX;
    distance < 15 && distance > -15 ? playlist.addClass('more-width') : playlist.removeClass('more-width');
    distance < 15 && distance > -15 ? lyrics.addClass('more-width') : lyrics.removeClass('more-width');
  });
});