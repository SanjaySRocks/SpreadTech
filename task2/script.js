
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
    const user = JSON.parse(localStorage.getItem("user"))
    
    if(!user)
        return alert("User not found in database!");
    
    if(Email.value == user.email && dcodeIO.bcrypt.compareSync(Password.value, user.password)){
        // Set Success Message
        setSuccess(1)
    }
    else{
        // Set Failed Message
        setSuccess(0)
    }
    

});

function setSuccess(success)
{
    const registerMsg = document.querySelector(".registered-msg")

    if(success){
        registerMsg.className = "registered-msg reg-success"
        registerMsg.innerHTML = "Successfully Logged In!";
    }else{
        registerMsg.className = "registered-msg reg-error"
        registerMsg.innerHTML = "Username/Password is Incorrect!";
    }


}

function setError(el, msg)
{
    const parentEl = el.parentElement;
    const errorMsg = parentEl.querySelector(".error-msg")

    errorMsg.innerHTML = msg;
}

function isEmail(email) {
    var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
 }
