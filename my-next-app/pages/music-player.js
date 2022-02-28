import React from "react";


const MusicPlayerFeature = () => {
  return <iframe width="100%" height="818px" frameBorder="0" src="music_player/music-player.html" />;
};

const MusicPlayer = (props) => {
  return (
    <div>
      <MusicPlayerFeature />
    </div>
  );
};

export { MusicPlayerFeature };
export default MusicPlayer;
