import React from "react";
import { MusicPlayerFeature, getPlaylist } from "./music-player";

const MainPage = (props) => {
  return (
    <div>
      <MusicPlayerFeature { ...props } />
    </div>
  );
};

MainPage.getInitialProps = getPlaylist;

export default MainPage;
