
function verifForm() {  
    
    
    // console.log(password_confirm.value)
    const TAILLE_PASSW = 12; //debug METTRE 12;


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
        alert("le mot de passe doit contenir au moins " + TAILLE_PASSW + " caractères, 1 majuscule, 1 minuscule, 1 caractère spécial, 1 chiffre");
        return false;
    }


    if (password.value.length < TAILLE_PASSW) {
        alert("le mot de passe doit contenir au moins " + TAILLE_PASSW + " caractères")
        return false;
    }

    
    hashPwd = md5(password.value)

    console.log('passe haché ',hashPwd);
    password.value=hashPwd;

    console.log('password.value ',password.value);

    // alert("debug bloqué"); 
    // return false;

    return true
}


function swapModif(){
    // alert('test');
    const boutton_modif = document.getElementsByClassName('modification1')
    const boutton_modif2 = document.getElementsByClassName('modification2')
    Array.from(boutton_modif).forEach(element => {
        element.style.visibility = "visible"
        
        console.log(element)
    });

    Array.from(boutton_modif2).forEach(element => {
            element.style.visibility = "hidden"
            console.log("element2")
            console.log(element)
    
 
    });
 
}

function updateUser(){
    alert("désolé, la modification de votre compte n'est pas possible pour le moment")
}