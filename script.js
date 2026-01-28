let contacts = [];
let groups = [];

function saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    localStorage.setItem('groups', JSON.stringify(groups));
}

function loadFromLocalStorage() {
    const contactsData = localStorage.getItem('contacts');
    const groupsData = localStorage.getItem('groups');
    if (contactsData) {
        contacts = JSON.parse(contactsData);
    }
    if (groupsData) {
        groups = JSON.parse(groupsData);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderContacts();
    renderGroups();
});

function addContact(contact) {
    contacts.push(contact);
    saveToLocalStorage();
    renderContacts();
}

function renderContacts(filteredContacts = contacts) {
  const list = document.getElementById("contactList");
  list.innerHTML = "";

  filteredContacts.forEach(contact => {
    const li = document.createElement("li");
    li.textContent = `${contact.lastName} ${contact.firstName}`;
    li.addEventListener("click", () => showContactDetails(contact.id));
    list.appendChild(li);
  });
}
function showContactDetails(id) {
  const contact = contacts.find(c => c.id === id);
  if (!contact) return;

  document.getElementById("details").innerHTML = `
    <h3>${contact.lastName} ${contact.firstName}</h3>
    <p>Mobil: ${contact.phone.mobile}</p>
    <p>Email: ${contact.email}</p>
    <p>Csoportok: ${contact.groups.join(", ") || "nincs"}</p>
  `;
}
function deleteContact(id) {
  contacts = contacts.filter(c => c.id !== id);
  saveToLocalStorage();
  renderContacts();
  document.getElementById("details").innerHTML = "<p>Válassz egy kontaktot a részletekhez.</p>";
}
function addGroup(name, description = "") {
  const newGroup = {
    id: crypto.randomUUID(),
    name,
    description
  };
  groups.push(newGroup);
  saveToLocalStorage();
  renderGroups();
}
function renderGroups() {
  const list = document.getElementById("groupList");
  list.innerHTML = "";
    groups.forEach(group => {
        const div = document.createElement("div");
        div.textContent = group.name;
        list.appendChild(div);
    });
}
function filterContactsByGroup(groupName) {
  if (groupName === "all") {
    renderContacts();
  } else {
    const filtered = contacts.filter(contact => contact.groups.includes(groupName));
    renderContacts(filtered);
  }
}
function showUngroupedContacts() {
  const ungrouped = contacts.filter(contact => contact.groups.length === 0);
  renderContacts(ungrouped);
}
