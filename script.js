const searchInput = document.getElementById("searchInput");
const sortFilter = document.getElementById("sortFilter");
const riskCheckboxes = document.querySelectorAll(".riskCheckbox");
const tableBody = document.querySelector("#toolsTable tbody");

const categoryToggle = document.getElementById("categoryToggle");
const categoryMenu = document.getElementById("categoryMenu");
const categoryItems = document.querySelectorAll("#categoryMenu .drop-item");

const trustToggle = document.getElementById("trustToggle");
const trustMenu = document.getElementById("trustMenu");
const trustItems = document.querySelectorAll("#trustMenu .drop-item");

const riskToggle = document.getElementById("riskToggle");
const riskMenu = document.getElementById("riskMenu");

let selectedCategory = "all";
let selectedTrust = "all";

function getRows() {
  return Array.from(tableBody.querySelectorAll("tr"));
}

function closeAllDropdowns() {
  categoryMenu.classList.remove("show");
  trustMenu.classList.remove("show");
  riskMenu.classList.remove("show");

  categoryToggle.parentElement.classList.remove("open");
  trustToggle.parentElement.classList.remove("open");
  riskToggle.parentElement.classList.remove("open");
}

/* Category dropdown */
categoryToggle.addEventListener("click", function (event) {
  event.stopPropagation();

  const isOpen = categoryMenu.classList.contains("show");
  closeAllDropdowns();

  if (!isOpen) {
    categoryMenu.classList.add("show");
    categoryToggle.parentElement.classList.add("open");
  }
});

categoryMenu.addEventListener("click", function (event) {
  event.stopPropagation();
});

categoryItems.forEach(item => {
  item.addEventListener("click", function () {
    categoryItems.forEach(i => i.classList.remove("selected"));
    this.classList.add("selected");

    selectedCategory = this.dataset.value;

    categoryToggle.textContent =
      selectedCategory === "all" ? "Category ▼" : this.textContent + " ▼";

    closeAllDropdowns();
    filterTable();
  });
});

/* Trust dropdown */
trustToggle.addEventListener("click", function (event) {
  event.stopPropagation();

  const isOpen = trustMenu.classList.contains("show");
  closeAllDropdowns();

  if (!isOpen) {
    trustMenu.classList.add("show");
    trustToggle.parentElement.classList.add("open");
  }
});

trustMenu.addEventListener("click", function (event) {
  event.stopPropagation();
});

trustItems.forEach(item => {
  item.addEventListener("click", function () {
    trustItems.forEach(i => i.classList.remove("selected"));
    this.classList.add("selected");

    selectedTrust = this.dataset.value;

    trustToggle.textContent =
      selectedTrust === "all" ? "Trust Level ▼" : this.textContent + " ▼";

    closeAllDropdowns();
    filterTable();
  });
});

/* Hallucination risk dropdown */
riskToggle.addEventListener("click", function (event) {
  event.stopPropagation();

  const isOpen = riskMenu.classList.contains("show");
  closeAllDropdowns();

  if (!isOpen) {
    riskMenu.classList.add("show");
    riskToggle.parentElement.classList.add("open");
  }
});

riskMenu.addEventListener("click", function (event) {
  event.stopPropagation();
});

/* Close dropdowns when clicking outside */
document.addEventListener("click", function () {
  closeAllDropdowns();
});

/* Filtering */
function filterTable() {
  const searchValue = searchInput.value.toLowerCase();

  const selectedRisks = Array.from(riskCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const rows = getRows();

  rows.forEach(row => {
    const toolName = row.cells[0].textContent.toLowerCase();
    const category = row.dataset.category;
    const trust = parseInt(row.dataset.trust, 10);
    const risk = row.dataset.risk;

    const matchesSearch = toolName.includes(searchValue);
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const matchesTrust =
      selectedTrust === "all" || trust >= parseInt(selectedTrust, 10);
    const matchesRisk =
      selectedRisks.length === 0 || selectedRisks.includes(risk);

    row.style.display =
      matchesSearch && matchesCategory && matchesTrust && matchesRisk
        ? ""
        : "none";
  });

  sortTable();
}

/* Sorting */
function sortTable() {
  const rows = getRows();

  rows.sort((a, b) => {
    const trustA = parseInt(a.dataset.trust, 10);
    const trustB = parseInt(b.dataset.trust, 10);
    const costA = a.dataset.cost || "";
    const costB = b.dataset.cost || "";

    if (sortFilter.value === "trustHigh") {
      return trustB - trustA;
    }

    if (sortFilter.value === "trustLow") {
      return trustA - trustB;
    }

    if (sortFilter.value === "costFree") {
      const freeOrder = { free: 0, freepaid: 1, paid: 2 };
      return (freeOrder[costA] ?? 99) - (freeOrder[costB] ?? 99);
    }

    if (sortFilter.value === "costPaid") {
      const paidOrder = { paid: 0, freepaid: 1, free: 2 };
      return (paidOrder[costA] ?? 99) - (paidOrder[costB] ?? 99);
    }

    return 0;
  });

  rows.forEach(row => tableBody.appendChild(row));
}

/* Event listeners */
searchInput.addEventListener("input", filterTable);
sortFilter.addEventListener("change", filterTable);

riskCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", filterTable);
});
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const reason = document.getElementById("reason").value;
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (name === "" || email === "" || reason === "" || message === "") {
      formMessage.textContent = "Please complete all fields before submitting.";
      formMessage.style.color = "red";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.color = "red";
      return;
    }

    formMessage.textContent = "Thank you. Your message has been submitted successfully.";
    formMessage.style.color = "green";

    contactForm.reset();
  });
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const msg = document.getElementById("loginMessage");

    if (user === "" || pass === "") {
      msg.textContent = "Please enter username and password.";
      msg.style.color = "red";
    } else {
      msg.textContent = "Login successful (demo only).";
      msg.style.color = "green";
    }
  });
}