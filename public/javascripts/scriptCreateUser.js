// Generate SHA-256 hash

var passe_hache = "init";

async function generateSHA256Hash(data) { 
	// Encode the data as UTF-8
	const encoder = new TextEncoder();
	const dataBuffer = encoder.encode(data);

	// Compute the hash
	const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);

	// Convert the hash to a hexadecimal string
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

	// console.log(hashHex);
    passe_hache = hashHex;
    return hashHex;
}

// Test the function with some inputs
// 64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c
// generateSHA256Hash('Hello world');

// c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7df31ad9e51a
// generateSHA256Hash('Hello world!');

function verifForm() {  // pb si async = retour imédiat => impossible bloquer le post
    //alert(password.value==password_confirm.value)
    
    console.log(password_confirm.value)
    const TAILLE_PASSW = 7; //debug METTRE 12;


    // if (password.value != password_confirm.value) {
    //     alert("erreur:le mot de passe et mot de passe confirmé sont différents")
    //     return false;
    // }

    // if (!(
    //     password.value.match(/[0-9]/g) &&
    //     password.value.match(/[A-Z]/g) &&
    //     password.value.match(/[a-z]/g) &&
    //     password.value.match(/[^a-zA-Z\d]/g)
    // )) {
    //     alert("le mot de passe doit contenir au moins " + TAILLE_PASSW + " caractères, 1 majuscule, 1 minuscule, 1 caractère spécial, 1 chiiffre");
    //     return false;
    // }


    // if (password.value.length < TAILLE_PASSW) {
    //     alert("le mot de passe doit contenir au moins " + TAILLE_PASSW + " caractères")
    //     return false;
    // }

    // console.log(crypto);
    // hashPwd = crypto.createHash('sha1').update(password.value).digest('hex');

    //  promise_pwd =  generateSHA256Hash(password.value);
    //  promise_pwd = await generateSHA256Hash(password.value);
    //  console.log(promise_pwd)

    //  promise_pwd.then((result)=>{
    //     console.log('debug:promise_pwd')
    //     console.log(result)
    //     hashPwd = result;     
    // });
     
    // hashPwd=promise_pwd
    hashPwd="tmp"
    // hashPwd= await generateSHA256Hash(password.value); //non si verifForm n'est pas async 
    // hashPwd = crypto.createHash('sha1').update(password.value).digest('hex');
    promise_pwd =  generateSHA256Hash(password.value);
    promise_pwd.then( (result)=>{
        console.log('result ',result);    
        hashPwd=result;

    });

    console.log('passe haché ',hashPwd);
    // password.value = hashPwd;
    password.value =passe_hache;
    console.log('password.value ',password.value);

    // alert("debug bloqué"); 
    // return false;

    return true
}