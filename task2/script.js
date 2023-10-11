// Firebase Config
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, child, push, query, orderByChild, equalTo, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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
const db = getDatabase()
const dbRef = ref(db,"users")


// Get Form Data
const Email = document.getElementById("email")
const Password = document.getElementById("pass")

const btnSubmit = document.getElementById("submit")

btnSubmit.addEventListener("click", function(e){
    e.preventDefault();

    // Trim Form Data
    Email.value = Email.value.trim()
    Password.value = Password.value.trim()

    // Validation
    if(Email.value == ""){
        return setError(Email, "Please enter email!");
    }else if(!isEmail(Email.value)){
        return setError(Email, "Please enter valid email!");
    }
    else{
        setError(Email, "");
    }

    if(Password.value == ""){
        return setError(Password, "Please enter Password!");
    }else { setError(Password, ""); }
  

    // Check for user in local storage
    get(query(dbRef, orderByChild('email'), equalTo(Email.value)))
    .then((snapshot) => {
        if (snapshot.exists()) {

            snapshot.forEach((data) => {
              const user = data.val();
                console.log(user);
              if (dcodeIO.bcrypt.compareSync(Password.value, user.password)){
                setSuccess(1, "Successfully Logged In!")
              } else {
                setSuccess(0, "Username/Password is Incorrect!")
              }
            });

        }
    })
    .catch((error) => {
        setSuccess(0, "Username/Password is Incorrect!")
    });    

});



function setSuccess(success, msg)
{
    const registerMsg = document.querySelector(".registered-msg")

    if(success){
        registerMsg.className = "registered-msg reg-success"
        registerMsg.innerHTML = msg;
    }else{
        registerMsg.className = "registered-msg reg-error"
        registerMsg.innerHTML = msg;
    }


}

function setError(el, msg)
{
    const parentEl = el.parentElement;
    const errorMsg = parentEl.querySelector(".error-msg")

    const inputField = parentEl.querySelector('.input-field')
    inputField.className = msg.length != 0 ? "input-field input-error" : "input-field"

    errorMsg.innerHTML = msg;
}

function isEmail(email) {
    var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
 }
