import Head from 'next/head';
import { Nav, Alert } from 'components';

function MyApp({ Component, pageProps }) {
  return <>
      <Head>
        <title>lucetre's frontend</title>
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
      </Head>

      <div className="app-container bg-light">
        <Nav />
        <Alert />
        <div className="container pt-4 pb-4">
          <Component {...pageProps} />
        </div>
      </div>
  </>;
}

export default MyApp
