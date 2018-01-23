//Click event for Edit and Delete buttons.
contacts.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const ul = button.parentNode;
    const ulChild = ul.childNodes;

    //Function for Edit button.
    edit = () => {
      for (var i = 0; i < contactsBook.length; i++) {
        if (contactsBook[i].firstName === ul.getAttribute('data-person')) {
          for (var j = 0; j < ulChild.length; j++) {
            if (ulChild[j].tagName === "LI") {
              const items = ulChild[j];
              const input = document.createElement('input');
              input.type = 'text';
              input.value = items.textContent;
              items.textContent = "";
              items.insertBefore(input, ulChild.childNodes);
              button.textContent = 'Save';
            };
          };
        };
      };
    };

    //Function for Save button.
    save = () => {
      for (var i = 0; i < contactsBook.length; i++) {
        if (contactsBook[i].firstName === ul.getAttribute('data-person')) {
          for (var k = 0; k < ulChild.length; k++) {
            if (ulChild[k].tagName === "LI") {
              const editedItems = ulChild[k];
              const inputs = editedItems.firstElementChild;
              const createItem = document.createElement("LI");
              createItem.textContent = inputs.value;
              editedItems.insertBefore(createItem, ulChild.childNodes);
              inputs.parentNode.removeChild(inputs);
              button.textContent = "Edit";

              contactsBook[i] = createItem.textContent;

            };
          };
        };
      };
    };

    //Function for Remove button.
    remove = () => {
      contacts.removeChild(ul);
      for (var i = 0; i < contactsBook.length; i++) {
        if (contactsBook[i].firstName === ul.getAttribute('data-person')) {
          contactsBook.splice(i,1);
          localStorage.setItem('addbook', JSON.stringify(contactsBook));
        };
      };
    };

    if (button.textContent === "Edit") {
      edit();
    } else if (button.textContent === "Save") {
      save();
    } else if (button.textContent === "Delete") {
      remove();
    };
  };
});
