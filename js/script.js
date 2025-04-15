let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveAndRenderCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const count = document.getElementById("cart-count");

  items.innerHTML = "";
  let totalValue = 0;
  let totalItems = 0;

  cart.forEach(({ id, name, price, quantity }) => {
    totalValue += price * quantity;
    totalItems += quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${name} - R$ ${price.toFixed(2)} x ${quantity}
      <br><button onclick="removeFromCart(${id})">Remover</button>
    `;
    items.appendChild(li);
  });

  total.textContent = totalValue.toFixed(2);
  count.textContent = totalItems;
}

function addToCart(id, name, price) {
  const item = cart.find(p => p.id === id);
  if (item) item.quantity++;
  else cart.push({ id, name, price, quantity: 1 });
  saveAndRenderCart();
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveAndRenderCart();
}

function esvaziarCarrinho() {
  cart = [];
  saveAndRenderCart();
}

function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("open");
}

// Inicializa ao carregar a página
saveAndRenderCart();

