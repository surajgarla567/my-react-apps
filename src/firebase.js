import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCAR8XUteCMYF7BUV7_ZwyvFm6KnPeUEYY",
    authDomain: "todo-app-ffb5f.firebaseapp.com",
    projectId: "todo-app-ffb5f",
    storageBucket: "todo-app-ffb5f.appspot.com",
    messagingSenderId: "875082984857",
    appId: "1:875082984857:web:06aa8b0b13d1fc2a267708"
});

const db = firebase.firestore();
export default db; 