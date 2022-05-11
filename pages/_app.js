import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} basePath="/freedom-average/api/auth">
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
