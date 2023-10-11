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
const Fname = document.getElementById("fname")
const Lname = document.getElementById("lname")
const Password = document.getElementById("pass")
const ConfirmPassword = document.getElementById("cpass")
const Email = document.getElementById("email")

// Get Btn
const btnSubmit = document.getElementById("submit")

// Get btn click
btnSubmit.addEventListener("click", function(e){
    e.preventDefault();

    Fname.value = Fname.value.trim()
    Lname.value = Lname.value.trim()
    Password.value = Password.value.trim()
    ConfirmPassword.value = ConfirmPassword.value.trim()
    Email.value = Email.value.trim()

    if(Fname.value == ""){
        return setError(Fname, "Please enter First name!");
    }else{ setError(Fname, ""); }

    if(Lname.value == ""){
        return setError(Lname, "Please enter Last name!");
    }
    else { setError(Lname, ""); }

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

    if(ConfirmPassword.value == ""){
        return setError(ConfirmPassword, "Please enter Confirm Password!");
    }else { setError(ConfirmPassword, ""); }

    

    if(Password.value != ConfirmPassword.value)
    {
        setError(Password, "Password do no match!")
        setError(ConfirmPassword, "Password do no match!")
        return;
    }

    
    const salt = dcodeIO.bcrypt.genSaltSync(10);
    const hashPass = dcodeIO.bcrypt.hashSync(Password.value, salt)

    const user = {
        fname: Fname.value,
        lname : Lname.value,
        email : Email.value,
        password: hashPass
    }

    // check if user exists or not
    get(query(dbRef, orderByChild('email'), equalTo(user.email)))
    .then((snapshot) => {
        if (snapshot.exists()) {
            setErrorMessage("Username already registered!")
        } else {
            // add user to database
            addToFirebase(user)
            .then(setSuccessMessage("User added successfully!"))
            .catch((error) =>{
                setErrorMessage(error);
            });  
        }
    })
    .catch((error) => {
        console.error('Error checking username:', error);
    });

    // localStorage.setItem("user", JSON.stringify(user))

    
});

function addToFirebase(user)
{
    return new Promise((resolve, reject)=>{

        const userid = push(child(ref(db), "users")).key;
        set(ref(db, "users/" + userid), user)
        .then( ()=> {resolve(); })
        .catch((error)=>{ reject(error); });

    })
    
}

    

function setErrorMessage(msg)
{
    const msgbox = document.querySelector(".registered-msg")
    msgbox.className = "registered-msg registered-error"
    msgbox.innerHTML = msg
}

function setSuccessMessage(msg)
{
    const msgbox = document.querySelector(".registered-msg")
    msgbox.className = "registered-msg registered-success"
    msgbox.innerHTML = msg

}

function setError(el, msg)
{
    const parentEl = el.parentElement;
    const errorMsg = parentEl.querySelector(".error-msg")

    const inputField = parentEl.querySelector(".input-field")
    inputField.className = msg.length == 0 ? "input-field" : "input-field input-error"
    errorMsg.innerHTML = msg;
}

function isEmail(email) {
    var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
 }
