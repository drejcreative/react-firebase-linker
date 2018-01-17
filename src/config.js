import * as firebase from 'firebase';

const projectConfig = {
    databaseLink: firebase.database().ref('items'),
};

export default projectConfig;
