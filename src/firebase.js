import firebase from 'firebase/app'
import 'firebase/analytics'

// Web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCWvbRXd7rzKfY6HEZ3Q6W4gDr5tx7eWFs",
  authDomain: "eiriksture0.firebaseapp.com",
  databaseURL: "https://eiriksture0.firebaseio.com",
  projectId: "eiriksture0",
  storageBucket: "eiriksture0.appspot.com",
  messagingSenderId: "668003640384",
  appId: "1:668003640384:web:103e23762632fedf046ba5",
  measurementId: "G-QQ27NWC1SV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const defaultAnalytics = firebase.analytics();

export default firebase