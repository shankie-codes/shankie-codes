import React, { useState, useEffect } from "react";
import {
  app,
  auth,
  firestore,
  storage,
  remoteConfig,
  firebase,
} from "../../helpers/firebase";

const FirebaseContext = React.createContext(null);
export default FirebaseContext;

export const FirebaseContextProvider = ({ children }) => {
  const [configuredRemoteConfig, setConfiguredRemoteConfig] = useState(null);

  useEffect(() => {
    if (!remoteConfig) return;
    let cfg = remoteConfig;
    // cfg.defaultConfig = strings;
    cfg.defaultConfig = {};

    cfg
      .fetchAndActivate()
      .then(() => {
        // showWelcomeMessage();
      })
      .catch((err) => {
        console.error(err);
      });

    cfg.settings = {
      // minimumFetchIntervalMillis: 3600000 // TODO: Set to this for closer to prod
      minimumFetchIntervalMillis: 600000, // one hour for now
    };

    setConfiguredRemoteConfig(cfg);
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        app,
        firestore,
        auth,
        storage,
        remoteConfig: configuredRemoteConfig,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
