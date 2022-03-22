import React from "react";
import { Link } from 'components';


const MainPage = (props) => {
  return (
    <>
      <h1>This is main page</h1>
      <ul>
        <li><Link href="/postgres">Postgres</Link></li>
        <li><Link href="/json">JSON</Link></li>
        <li><Link href="/discord">Discord</Link></li>
        <li><Link href="/new">New</Link></li>
      </ul>
    </>
  );
};

export default MainPage;
