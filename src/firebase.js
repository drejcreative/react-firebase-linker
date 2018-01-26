import firebase from 'firebase';

const config = {
  apiKey: "###",
  authDomain: "###",
  databaseURL: "###",
  projectId: "###",
  storageBucket: "###",
  messagingSenderId: "###"
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
