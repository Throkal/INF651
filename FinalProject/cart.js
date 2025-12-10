function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartContainer");
  const totalPrice = document.getElementById("totalPrice");

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.qty}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    container.appendChild(div);
  });

  totalPrice.textContent = "Total: $" + total.toFixed(2);
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();
