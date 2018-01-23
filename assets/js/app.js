//Buttons.
const search = document.querySelector("#filter");
const createButton = document.querySelector("#create");
const addButton = document.querySelector("#add");
const finishButton = document.querySelector("#finish")

const contactInputs = document.querySelectorAll("#createContact p input");
const createContactForm = document.querySelector("#createContact");

let contacts = document.querySelector("#contacts");

//Array holding the the Objects(Contacts).
let contactBook = JSON.parse(localStorage.getItem('addbook')) || [];

//Form fields.
const name = document.querySelector("#name");
const phoneNumber = document.querySelector("#phoneNumber");
const email = document.querySelector("#email");

//Class constructor for person object.
class entry {
  constructor (name, phoneNumber, email) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
  };
};

//Function for Filter.
search.addEventListener("keyup", function(e) {
  const searchInput = e.target.value.toLowerCase();
  const li = document.getElementsByTagName('li');

  for (var i = 0; i < li.length; i++) {
    if (li[i].textContent.toLowerCase().indexOf(searchInput) != -1) {
      li[i].parentNode.style.display = "block";
    } else {
      li[i].parentNode.style.display = "none";
    };
  };
});

//Function to create list items.
createLi = () => {
  if (!contactBook[0]) {
    contacts.innerHTML;
  } else {
    contacts.innerHTML = "";
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
};

//Function to show all contacts.
show = () => {
  contactBook = JSON.parse(localStorage.getItem('addbook'));
  createLi();
};

show();

//Click event show contact creation form.
createButton.addEventListener("click", () => {
  createContactForm.style.display = "block";
});

//Click event to close contact creation form.
finishButton.addEventListener("click", () => {
  createContactForm.reset();
  createContactForm.style.display = "none";
});

//Click event to add new contact as object to local storage.
addButton.addEventListener("click", () => {
    let person = new entry(name.value, phoneNumber.value, email.value);
    contactBook.push(person);
    localStorage.setItem('addbook', JSON.stringify(contactBook));
    createContactForm.reset();
    show();
});
