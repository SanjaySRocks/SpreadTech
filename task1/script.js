const Fname = document.getElementById("fname")
const Lname = document.getElementById("lname")
const Password = document.getElementById("pass")
const ConfirmPassword = document.getElementById("cpass")
const Email = document.getElementById("email")

const btnSubmit = document.getElementById("submit")

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

    if(Password.value == ""){
        return setError(Password, "Please enter Password!");
    }else { setError(Password, ""); }

    if(ConfirmPassword.value == ""){
        return setError(ConfirmPassword, "Please enter Confirm Password!");
    }else { setError(ConfirmPassword, ""); }

    if(Email.value == ""){
        return setError(Email, "Please enter email!");
    }else if(!isEmail(Email.value)){
        return setError(Email, "Please enter valid email!");
    }
    else{
        setError(Email, "");
    }

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

    localStorage.setItem("user", JSON.stringify(user))

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
