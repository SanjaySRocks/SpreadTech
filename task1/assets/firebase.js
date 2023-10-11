// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, child, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAn77TlRIPndZ8p9r0GLCPU1axjwM0hEk",
  authDomain: "spreadtech-6438a.firebaseapp.com",
  projectId: "spreadtech-6438a",
  storageBucket: "spreadtech-6438a.appspot.com",
  messagingSenderId: "1057692660223",
  appId: "1:1057692660223:web:be08c9aab7ba9ac990f7ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
