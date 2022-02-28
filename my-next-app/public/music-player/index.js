
$(document).ready(function() {  
  var audio = $("audio").get(0);
  audio.load();

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