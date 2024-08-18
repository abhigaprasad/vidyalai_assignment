import React from 'react';
import { WindowWidthProvider } from '../components/context/WindowWidthContext'; // Adjust the path as needed

const App = ({ Component, pageProps }) => (
  <React.Fragment>
    <WindowWidthProvider>
      <Component {...pageProps} />
    </WindowWidthProvider>
  </React.Fragment>
);

export default App;
