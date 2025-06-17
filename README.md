# initialisation

- utiliser la base de l'UTC cf /model/db.js OU BIEN créer une base locale :
        model/db.js : copier db.js__LOCALE__ (et creer une base locale avec /sqlFiles/sr10...sql) ou copier db.js__TUXA1__ ou db.js__TUXA2__ pour accéder à la base de l'UTC

# connexion
exemples d'utilisateurs pour tester:

admin@gmail.com : admin

recrut@gmail.com : recrut

mdp userX@gmail.com : Pa$$word1234


# RENDUS

#### SUR GITLAB : TD 1 ET 2
puis
#### SUR GITHUB : https://github.com/IceSkull08/PoleEmploie/commits/main

- TD3 : 2 mai (limite 3 mai)

https://github.com/IceSkull08/PoleEmploie/commit/aee306ee17e3d0de8ccdbdc330b09cfd6dfb14d7

- TD4 : 3 juin (limite 7 juin)

https://github.com/IceSkull08/PoleEmploie/commit/d972f8d9523796319ea0eb2e75f41ecb1c54833b

- TD5 et 6 : dernier commit
https://github.com/IceSkull08/PoleEmploie/commits/main/


les mdp sont hashé coté client puis le hash est hashé coté serveur => probleme résolut afin que ca fonctionne, mais pas la methode adéquat. Je n'avais pas le temps de tout modifier

NON FAIT :
        => accepter/refuser les demandes de créations d'organisation
        => possibilité de voir nos candidatures sur la page "mon compte"

AMELIORATION POSSIBLE :
        => code plus lisible avec plus de test/commentaire
        => fonction de debug pour rendre les tests plus facile
        => hashage du mdp a revoir (actuellement coté serveur et coté client => 2 opéartions non utiles)
        