const organisationRecruteur = document.getElementById('organisationDemandeRecruteur');
  const sirenRecruteur = document.getElementById('sirenDemandeRecruteur');

  organisationRecruteur.addEventListener('change', (event) => {
    sirenRecruteur.value = event.target.value;
    // console.log("Organisation changed to:", event.target.value);
  });

  sirenRecruteur.addEventListener('change', (event) => {
    organisationRecruteur.value = event.target.value;
    // console.log("Siren changed to:", event.target.value);
  });