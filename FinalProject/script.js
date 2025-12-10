// ---------------- HOME PAGE/INDEX ------------------

//Redirects the user to the About page when they click "ABOUT US"
const aboutUsBtn = document.getElementById("aboutUsBtn");

if (aboutUsBtn) {
  aboutUsBtn.addEventListener("click", () => {
    window.location.href = "about.html";
  });
}

//Mood selection buttons on the homepage
const moodButtons = document.querySelectorAll(".mood-btn");
const moodResponse = document.getElementById("moodResponse");

// Only run this if the mood ui exists on the page
if (moodButtons && moodResponse) {
  moodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mood = btn.dataset.mood; // "good", "okay", or "bad"

      // Show friendly message based on what the user select
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

//Toggling phone number visibility when user clicks
if (showPhone) {
  showPhone.addEventListener("click", () => {
    phoneNumber.classList.toggle("hidden");

    // Change text so the user can choose to hide it again
    showPhone.textContent = 
      phoneNumber.classList.contains("hidden")
      ? "click here"
      : "hide number";
  });
}

// ---------------- PRODUCTS PAGE ------------------
// product DB for the shop
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

// Page elements used for filtering and sorting
const container = document.getElementById("productContainer");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

// Renders product card based on search, category and sort option
function renderProducts() {
  // Only execute if we're on the product page
  if (!container|| !searchBox || !categoryFilter || !sortFilter) return;

  let list = [...products]; // making a fresh copy to safely filter

// Search
const search = searchBox.value.toLowerCase();

//Matches search terms using the beginning of words
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

  //Clear the display and rebuild it
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
  attachCartButtons(); // re attach cart button listeners each time UI updates
}

// Only run product rendering if this page has the container
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

    //User inputs
    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const msg = document.getElementById("contactMsg");

    //Error message elements
    const nameErr = document.getElementById("nameErr");
    const emailErr = document.getElementById("emailErr");
    const msgErr = document.getElementById("msgErr");

    //Reset old error messages
    nameErr.textContent = emailErr.textContent = msgErr.textContent = "";

    // validation checks
    if (name.value.length < 3) {
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


