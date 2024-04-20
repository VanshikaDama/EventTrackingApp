// Import the functions you need from the SDKs you need
// compat packages are API compatible with namespaced code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "################",
  authDomain: "#############",
  projectId: "####################",
  storageBucket: "######################",
  messagingSenderId: "######################1",
  appId:  "########################"
};



// Initialize Firebase
let app;
if(firebase.apps.length === 0)
{
app  = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app()
}
 

 

export default firebaseConfig;



