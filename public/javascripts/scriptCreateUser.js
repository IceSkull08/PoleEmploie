function verifForm(){
    // alert(password.value==password_confirm.value)
    // console.log(password_confirm.value)

    if (password.value!=password_confirm.value){
        alert("erreur:le mot de passe et mot de passe confirmé sont différents")
        return false;
    }
    return true
}