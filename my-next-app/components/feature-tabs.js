import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { TabHead, TabContainer, TabBody, Tab } from "../styles/styles";
import { NewFeature } from "../pages/new";
import { MusicPlayerFeature } from "../pages/music-player";

const FeatureTabs = ({ router }) => {
  const {
    query: { tab },
  } = router;

  const isTabOne   = tab === "1" || tab == null;
  const isTabTwo   = tab === "2";
  const isTabThree = tab === "3";
  return (
    <TabContainer>
      <TabHead>
        <Tab selected={isTabOne}>
          <Link href={{ pathname: "/", query: { tab: "1" } }}>
            <a>Feature #1: music-player</a>
          </Link>
        </Tab>
        <Tab selected={isTabTwo}>
          <Link href={{ pathname: "/", query: { tab: "2" } }}>
            <a>Feature #2: TBD</a>
          </Link>
        </Tab>
        <Tab selected={isTabThree}>
          <Link href={{ pathname: "/", query: { tab: "3" } }}>
            <a>Feature #3: TBD</a>
          </Link>
        </Tab>
      </TabHead>
      <TabBody>
        <React.Fragment>
          {isTabOne   && <MusicPlayerFeature></MusicPlayerFeature>}
          {isTabTwo   && <NewFeature></NewFeature>}
          {isTabThree && <NewFeature></NewFeature>}
        </React.Fragment>
      </TabBody>
    </TabContainer>
  );
};

export default withRouter(FeatureTabs);
