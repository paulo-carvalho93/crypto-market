const firebaseConfig = {
  apiKey: process.ENV.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.ENV.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.ENV.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.ENV.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.ENV.REACT_APP_FIREBASE_MESSAGING_SENDERID,
  appId: process.ENV.REACT_APP_FIREBASE_APP_ID
};

export default firebaseConfig;