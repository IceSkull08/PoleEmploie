function verifForm() {
    //alert(password.value==password_confirm.value)
    console.log(password_confirm.value)
    const TAILLE_PASSW = 7; //debug METTRE 12;


    if (password.value != password_confirm.value) {
        alert("erreur:le mot de passe et mot de passe confirmé sont différents")
        return false;
    }

    if (!(
        password.value.match(/[0-9]/g) &&
        password.value.match(/[A-Z]/g) &&
        password.value.match(/[a-z]/g) &&
        password.value.match(/[^a-zA-Z\d]/g)
    )) {
        alert("le mot de passe doit contenir au moins " + TAILLE_PASSW + " caractères, 1 majuscule, 1 minuscule, 1 caractère spécial, 1 chiiffre");
        return false;
    }


    if (password.value.length < TAILLE_PASSW) {
        alert("le mot de passe doit contenir au moins " + TAILLE_PASSW + " caractères")
        return false;
    }

    // alert("debug bloqué"); return false;

    return true
}