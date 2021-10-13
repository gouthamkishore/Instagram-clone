import firebase from "firebase"

// import { initializeApp } from 'firebase/app';
// import { getAuth} from "firebase/auth";
// import { getStorage } from "firebase/storage"
// import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAizscFL857dDnxzG40BuJhPGaHuPeAwEY",
  authDomain: "instagram-clone-108ab.firebaseapp.com",
  projectId: "instagram-clone-108ab",
  storageBucket: "instagram-clone-108ab.appspot.com",
  messagingSenderId: "718691208797",
  appId: "1:718691208797:web:499b1110f41374e6f407b4",
  measurementId: "G-5YXNFG7MTC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore()
const auth = firebase.auth();
//const storage = getStorage(firebaseApp);
const storage = firebase.storage();

export  {db, auth, storage }
