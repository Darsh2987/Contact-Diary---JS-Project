
window.addEventListener('load', () => {

  //Array holding the the Objects(Contacts).
  let contactBook = [];

  //Function to show all contacts.
  show = () => {
    contactBook = (localStorage.getItem('addbook')) ? JSON.parse(localStorage.getItem('addbook')) : localStorage.setItem('addbook', JSON.stringify([]));

    //Funtion to sort contacts/objects alphabetically
    function compare(a, b) {
      let comparison = 0;

      if (a.name > b.name) {
        comparison = 1;
      } else if (a.name < b.name) {
        comparison = -1
      }
      return comparison;
    };

    contactBook.sort(compare);

    let contacts = document.querySelector("#contacts");

    contacts.innerHTML = "";

    //Function to create list items.
    for (var i in contactBook) {
      let list = document.createElement("ul");
      let name = document.createElement("li");
      let phoneNum = document.createElement("li");
      let email = document.createElement("li");
      const deleteButton = document.createElement("button");

      let nameString = contactBook[i].name;
      let phoneNumString = contactBook[i].phoneNumber;
      let emailString = contactBook[i].email;

      name.textContent = nameString;
      phoneNum.textContent = phoneNumString;
      email.textContent = emailString;
      deleteButton.textContent = "Delete";

      list.appendChild(name);
      list.appendChild(phoneNum);
      list.appendChild(email);
      list.appendChild(deleteButton);
      contacts.appendChild(list);

      list.setAttribute('data-person', contactBook[i].name);

      list.className = 'person';
      name.className = 'name';
      phoneNum.className = 'phoneNum';
      email.className = 'emailAddress'
      deleteButton.className = 'deleteButton'

      //Click Event Target for Delete button.
      deleteButton.addEventListener("click", () => {
        const parent = deleteButton.parentNode;
        contacts.removeChild(parent);
        for (let i = 0; i < contactBook.length; i++) {
          if (contactBook[i].name === parent.getAttribute('data-person')) {
            contactBook.splice(i,1);
            localStorage.setItem('addbook', JSON.stringify(contactBook));
          };
        };
      });
    };
  };

  show();

  //Function for Filter.
  document.querySelector("#filter").addEventListener("keyup", function(e) {
    const input = e.target.value.toLowerCase();
    const ul = document.querySelectorAll('#contacts ul');

    for (var i = 0; i < ul.length; i++) {
      const filterName = ul[i].querySelector('.name').textContent.toLowerCase();
      const filterPhoneNumber = ul[i].querySelector('.phoneNum').textContent;
      const filterEmail = ul[i].querySelector('.emailAddress').textContent.toLowerCase();
      if (filterName.includes(input) || filterEmail.includes(input) || filterPhoneNumber.includes(input)) {
        ul[i].style.display = "";
      } else {
        ul[i].style.display = "none";
      };
    };
  });

  //Click event - Open contact creation form.
  document.querySelector("#create").addEventListener("click", () => {
    const createContactForm = document.querySelector(".createContact");
    const contactCards = document.querySelector("#contacts");

    //Form fields.
    const name = document.querySelector("#name");
    const phoneNumber = document.querySelector("#phoneNumber");
    const email = document.querySelector("#email");

    //Click event to add new contact as object to local storage.
    document.querySelector("#add").addEventListener("click", () => {

      //Class constructor for person object.
      class entry {
        constructor (name, phoneNumber, email) {
          this.name = name;
          this.phoneNumber = phoneNumber;
          this.email = email;
        };
      };

      let person = new entry(name.value, phoneNumber.value, email.value);
      contactBook.push(person);
      localStorage.setItem('addbook', JSON.stringify(contactBook));
      createContactForm.reset();
      name.focus();
      show();
    });

    //Click event to close contact creation form.
    document.querySelector("#finish").addEventListener("click", () => {
      createContactForm.reset();
      createContactForm.classList.remove("createContact-is-visible");
      contactCards.style.opacity = 1;
    });

    name.focus();
    contactCards.style.opacity = .2;
    createContactForm.classList.add("createContact-is-visible");
  });
});
