import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyASnWQq7m07v9e9eBNYrfIYOfv0AMCmy9s",
    authDomain: "firestore-practice-store-438ac.firebaseapp.com",
    projectId: "firestore-practice-store-438ac",
    storageBucket: "firestore-practice-store-438ac.appspot.com",
    messagingSenderId: "121869056699",
    appId: "1:121869056699:web:a366f7d589ad916a9f879e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//initialize firestore
const realtimeFirestore = firebase.firestore()

export { realtimeFirestore }