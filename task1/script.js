const Fname = document.getElementById("fname")
const Lname = document.getElementById("lname")
const Password = document.getElementById("pass")
const ConfirmPassword = document.getElementById("cpass")
const Email = document.getElementById("email")

const btnSubmit = document.getElementById("submit")

btnSubmit.addEventListener("click", function(e){
    e.preventDefault();

    if(Fname.value.trim() == ""){
        return setError(Fname, "Please enter First name!");
    }else{ setError(Fname, ""); }

    if(Lname.value.trim() == ""){
        return setError(Lname, "Please enter Last name!");
    }
    else { setError(Lname, ""); }

    if(Password.value.trim() == ""){
        return setError(Password, "Please enter Password!");
    }else { setError(Password, ""); }

    if(ConfirmPassword.value.trim() == ""){
        return setError(ConfirmPassword, "Please enter Confirm Password!");
    }else { setError(ConfirmPassword, ""); }

    if(Email.value.trim() == ""){
        return setError(Email, "Please enter email!");
    }else if(!isEmail(Email.value)){
        return setError(Email, "Please enter valid email!");
    }
    else{
        setError(Email, "");
    }

    if(Password.value.trim() != ConfirmPassword.value.trim())
    {
        setError(Password, "Password do no match!")
        setError(ConfirmPassword, "Password do no match!")
        return;
    }

    setSuccess();
    

});

function setSuccess()
{
    const successMsg = document.querySelector(".registered-success")
    successMsg.innerHTML = "Successfully registered!";

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