import React from "react";
import { FirebaseContextProvider } from "../components/context/FirebaseContext";

const App = ({ Component, pageProps }) => {
  return (
    <FirebaseContextProvider>
      <Component {...pageProps} />
    </FirebaseContextProvider>
  );
};

// const App = ({ Component, pageProps }) => {
//   return <Component {...pageProps} />;
// };
export default App;
