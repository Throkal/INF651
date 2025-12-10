// CART PAGE - Displaying and removing items

// Loads everything currently in the cart and display it on the page
function loadCart() {
  //pull saved cart from localStorage or empty array if it doesn't exist yet
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartContainer");
  const totalPrice = document.getElementById("totalPrice");

  //clear previous cart content before rebuilding the UI
  container.innerHTML = "";

  // If there's nothing in the cart, show users a message
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.textContent = "";
    return;
  }

  let total = 0;

  //create a row for every item
  cart.forEach((item, index) => {
    total += item.price * item.qty; // keep track of total

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.qty}</p>
      <!-- Remove button trigger the removeItem() function -->
      <button onclick="removeItem(${index})">Remove</button>
    `;
    container.appendChild(div);
  });

  //update the total cost at the bottom
  totalPrice.textContent = "Total: $" + total.toFixed(2);
}

// Removes an item from the cart by its index then reload UI
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Remove that one item
  cart.splice(index, 1);
  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Re render the cart 
  loadCart();
}

//load the cart when the page opens
loadCart();
