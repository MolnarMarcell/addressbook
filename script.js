let contacts = [];
let groups = [];

document.addEventListener("DOMContentLoaded", () => {
    contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    groups   = JSON.parse(localStorage.getItem("groups")) || [];

    renderContacts();
    renderGroups();
    renderGroupCheckboxes();
});

function save() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    localStorage.setItem("groups", JSON.stringify(groups));
}

function go(page) {
    window.location.href = page;
}

/* ===== NÉVJEGYEK ===== */
function renderContacts() {
    const list = document.getElementById("contactList");
    if (!list) return;

    list.innerHTML = "";

    if (contacts.length === 0) {
        list.innerHTML = "<li style='text-align:center;color:#888'>Nincs még névjegy</li>";
        return;
    }

    contacts.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.lastName} ${c.firstName}`;
        li.onclick = () => showDetails(c.id);
        list.appendChild(li);
    });
}

function showDetails(id) {
    const c = contacts.find(x => x.id === id);
    const d = document.getElementById("details");
    if (!c || !d) return;

    d.innerHTML = `
        <h3>${c.lastName} ${c.firstName}</h3>
        <p>📱 ${c.mobile || "-"}</p>
        <p>🏠 ${c.home || "-"}</p>
        <p>✉️ ${c.email || "-"}</p>
        <p>🎂 ${c.birth || "-"}</p>
        <p>📍 ${c.address || "-"}</p>
        <p>${c.note || ""}</p>
        <button onclick="deleteContact('${c.id}')">Törlés</button>
    `;
}

function deleteContact(id) {
    contacts = contacts.filter(c => c.id !== id);
    save();
    renderContacts();
    document.getElementById("details").innerHTML = "";
}

function saveContact() {
    contacts.push({
        id: crypto.randomUUID(),
        lastName: lastName.value,
        firstName: firstName.value,
        mobile: mobile.value,
        home: home.value,
        email: email.value,
        address: address.value,
        birth: birth.value,
        note: note.value,
        groups: [...document.querySelectorAll(".group:checked")].map(g => g.value)
    });

    save();
    go("index.html");
}

/* ===== CSOPORTOK ===== */
function addGroup() {
    if (!groupName.value.trim()) return;

    groups.push({
        id: crypto.randomUUID(),
        name: groupName.value
    });

    save();
    renderGroups();
}

function renderGroups() {
    const list = document.getElementById("groupList");
    if (!list) return;

    list.innerHTML = "";
    groups.forEach(g => {
        const li = document.createElement("li");
        li.textContent = g.name;
        li.onclick = () => {
            groups = groups.filter(x => x.id !== g.id);
            save();
            renderGroups();
        };
        list.appendChild(li);
    });
}

function renderGroupCheckboxes() {
    const box = document.getElementById("groupBoxes");
    if (!box) return;

    box.innerHTML = "";
    groups.forEach(g => {
        box.innerHTML += `
            <label class="group-box">
                <input type="checkbox" class="group" value="${g.name}">
                ${g.name}
            </label>
        `;
    });
}
