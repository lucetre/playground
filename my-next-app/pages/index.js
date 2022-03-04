import React from "react";
import { MusicPlayer as MusicPlayer, getPlaylist } from "./music";

const MainPage = (props) => {
  return (
    <div>
      <MusicPlayer { ...props } />
    </div>
  );
};

MainPage.getInitialProps = getPlaylist;

export default MainPage;
