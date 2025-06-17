function verifMdp(){
    hashPwd = md5(password.value)
    console.log('debug : scriptLogin => verifMdp()');
    console.log('debug : scriptLogin => password.value ',password.value);
    console.log('debug : scriptLogin => hashPwd ',hashPwd);
    password.value=hashPwd;

    console.log('debug : scriptLogin => password.value ',password.value);

    return true
}