import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCCsxHSKLxAGdYziVIRuisZMG8xA-xFIFM",
  authDomain: "react-data-dd905.firebaseapp.com",
  databaseURL: "https://react-data-dd905.firebaseio.com",
  projectId: "react-data-dd905",
  storageBucket: "react-data-dd905.appspot.com",
  messagingSenderId: "601124437985"
};
firebase.initializeApp(config);

export default firebase;

const rootRef = firebase.database().ref();

export const tasksRef = rootRef.child('items');

export function setItem(data) {
   const link = rootRef.child(`/items/${data}`);
   return link;
}

export const timeRef = firebase.database.ServerValue.TIMESTAMP;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
