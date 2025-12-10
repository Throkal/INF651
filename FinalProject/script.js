// ---------------- HOME PAGE/INDEX ------------------

const aboutUsBtn = document.getElementById("aboutUsBtn");

if (aboutUsBtn) {
  aboutUsBtn.addEventListener("click", () => {
    window.location.href = "about.html";
  });
}
const moodButtons = document.querySelectorAll(".mood-btn");
const moodResponse = document.getElementById("moodResponse");

if (moodButtons && moodResponse) {
  moodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mood = btn.dataset.mood;

      if (mood === "good") {
        moodResponse.textContent = "Great to hear! Keep taking care of your health. 😊";
      } 
      else if (mood === "okay") {
        moodResponse.textContent = "We hope your day gets even better. Stay healthy! 💙";
      } 
      else {
        moodResponse.textContent = 
          "Sorry to hear that. You may find helpful items in our wellness section. 🤒";
      }
    });
  });
}

// ---------------- ABOUT PAGE ------------------
const showPhone = document.getElementById("showPhone");
const phoneNumber = document.getElementById("phoneNumber");

if (showPhone) {
  showPhone.addEventListener("click", () => {
    phoneNumber.classList.toggle("hidden");

    // Optional text change
    showPhone.textContent = 
      phoneNumber.classList.contains("hidden")
      ? "click here"
      : "hide number";
  });
}

// ---------------- PRODUCTS PAGE ------------------
const products = [
  { name: "Vitamin C", 
    price: 17.99, 
    category: "Supplements", 
    image: "images/vitamin c.jpg"},
  { name: "Omega-3", 
    price: 27.99, 
    category: "Supplements", 
    image: "images/omega3.jpg"},
  { name: "L-theanine", 
    price: 18.99, 
    category: "Supplements", 
    image: "images/l-theanine.jpg"},
  { name: "Tylenol",
    price: 12.99,
    category: "Pain Relief", 
    image: "images/Tylenol.jpg" },
  { name: "Ibuprofen",
    price: 9.99,
    category: "Pain Relief", 
    image: "images/ibuprofen.jpg" },
  { name: "Allergy Pills", 
    price: 7.99, 
    category: "Allergy", 
    image: "images/allergy.jpg" },
  { name: "Oximeter", 
    price: 17.99, 
    category: "Medical Devices", 
    image: "images/oximeter.jpg" },
  { name: "Blood Pressure Monitor", 
    price: 27.99, 
    category: "Medical Devices", 
    image: "images/Blood pressure monitor.jpg" },
];

const container = document.getElementById("productContainer");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

function renderProducts() {
  if (!container|| !searchBox || !categoryFilter || !sortFilter) return;

  let list = [...products];

// Search
const search = searchBox.value.toLowerCase();

list = list.filter(p => 
  p.name
    .toLowerCase()
    .split(" ")
    .some(word => word.startsWith(search))
);

  // Category filter
  const cat = categoryFilter.value;
  if (cat !== "all") list = list.filter(p => p.category === cat);

  // Sorting
  if (sortFilter.value === "price-asc") list.sort((a,b)=>a.price-b.price);
  if (sortFilter.value === "price-desc") list.sort((a,b)=>b.price-a.price);
  if (sortFilter.value === "name") list.sort((a,b)=>a.name.localeCompare(b.name));

  container.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
    <img src="${p.image}" alt="${p.name}" class="product-img">
    <h3>${p.name}</h3>
    <p class="price">$${p.price}</p>
    <p class="category">${p.category}</p>
    <button class="add-btn" data-name="${p.name}">Add to Cart</button>
    `;
    container.appendChild(div);
  });
  attachCartButtons();
}

if (container) {
  renderProducts();
  searchBox.addEventListener("input", renderProducts);
  categoryFilter.addEventListener("change", renderProducts);
  sortFilter.addEventListener("change", renderProducts);
}

// ---------------- CONTACT PAGE ------------------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const msg = document.getElementById("contactMsg");

    const nameErr = document.getElementById("nameErr");
    const emailErr = document.getElementById("emailErr");
    const msgErr = document.getElementById("msgErr");

    nameErr.textContent = emailErr.textContent = msgErr.textContent = "";

    if (name.value.length < 2) {
      nameErr.textContent = "Enter a valid name.";
      valid = false;
    }

    if (!email.value.includes("@")) {
      emailErr.textContent = "Enter a valid email.";
      valid = false;
    }

    if (msg.value.length < 5) {
      msgErr.textContent = "Message too short.";
      valid = false;
    }

    if (valid) {
      document.getElementById("contactSuccess").textContent =
        "Message sent successfully!";
      contactForm.reset();
    }
  });
}

// ---------------- CART SYSTEM ------------------
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item already exists
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

// Attach to buttons after rendering
function attachCartButtons() {
  const buttons = document.querySelectorAll(".add-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const product = products.find(p => p.name === name);
      addToCart(product);
    });
  });
}


