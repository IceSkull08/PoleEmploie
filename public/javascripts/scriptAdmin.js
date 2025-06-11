// console.log('scriptAdmin.js');
const userItems = document.querySelectorAll('[id^="userItem"]');
    userItems.forEach((userItem) => {
        // console.log(` debug : userItem: ${userItem.id}`);

      const id = userItem.id.replace("userItem", "");
        // console.log(` debug : userItem ID: ${id}`); 
      const userBody = document.getElementById(`userBody${id}`);
        // console.log(` debug : userBody: ${userBody ? userBody.id : 'not found'}`);

      if (userBody) {
        userItem.addEventListener('click', () => {
            // console.log(` debug : Toggling visibility for user body with ID: ${userBody.id}`);
          userBody.hidden = !userBody.hidden;
        });
      }
    });

function submitWithSearch() {
    const searchValue = document.getElementById('mainSearch').value;
    document.getElementById('searchHidden').value = searchValue;
    document.getElementById('filtreForm').submit();
  } 