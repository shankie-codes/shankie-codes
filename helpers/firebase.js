import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import config from "../firebase-config";

const isServer = typeof window === "undefined";

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
let remoteConfig;

if (!isServer) {
  // Even `import`ing remote config on the server causes bad times
  // eslint-disable-next-line global-require
  require("firebase/remote-config");
  remoteConfig = firebase.remoteConfig();
}

export { app, auth, firestore, storage, firebase, remoteConfig };
