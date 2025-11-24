// 🔄 Dropdown toggle
function toggleDropdown() {
  const panel = document.getElementById("category-panel");
  panel.classList.toggle("hidden");
  document.getElementById("man-options").classList.add("hidden");
  document.getElementById("tech-options").classList.add("hidden");
}

// 🔐 Login control
function openLogin() {
  document.getElementById("login-modal").classList.remove("hidden");
}
function closeLogin() {
  document.getElementById("login-modal").classList.add("hidden");
}

// 🔎 Panel display
function showPanel(type) {
  document.getElementById("man-options").classList.add("hidden");
  document.getElementById("tech-options").classList.add("hidden");
  const target = type === "man" ? "man-options" : "tech-options";
  document.getElementById(target).classList.remove("hidden");
  document.getElementById("category-panel").classList.remove("hidden");
}

// ⬇️ Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// 🎁 Product data
const productData = {
  beauty: [
    { img: "beauty1.jpg", text: "Skin Serum", price: "2800 da" },
    { img: "beauty2.jpg", text: "ASTcream", price: "950 da" },
    { img: "beauty3.jpg", text: "AST pack", price: "3700 da" }
  ],
  home: [
    { img: "home1.jpg", text: "AST apron", price: "1750 da" },
    { img: "home2.jpg", text: "AST socks", price: "630 da" },
    { img: "home3.jpg", text: "AST baby", price: "1900 da" }
  ],
  ast: [
    { img: "shirt1.jpg", text: "NEST shirt", price: "1500 da" },
    { img: "shirt2.jpg", text: "AST shirt", price: "1500 da" },
    { img: "shirt3.jpg", text: "AST bag", price: "900 da" }
  ],
  banners: [
    { img: "banner1.jpg", text: "NEST Banner", price: "15000 da" },
    { img: "banner2.jpg", text: "AST Banner", price: "9990 da" }
  ],
  frames: [
    { img: "frame1.jpg", text: "Robot Frame ", price: "980 da" },
    { img: "frame2.jpg", text: "Mech Frame", price: "1000 da" }
  ],
  others: [
    { img: "others.jpg", text: "AST cake", price: "12900 da" },
    { img: "others.jpg", text: "AST cake", price: "1300 da" },
    { img: "others.jpg", text: "AST cake", price: "1300 da" }
  ]
};

// 🔁 Rotate cards
function rotateCards(section, slotIndex, delay) {
  const items = productData[section];
  if (!items || items.length === 0) return;

  let current = slotIndex % items.length;

  const imgEl = document.getElementById(`${section}-img${slotIndex + 1}`);
  const titleEl = document.getElementById(`${section}-title${slotIndex + 1}`);
  const descEl = document.getElementById(`${section}-desc${slotIndex + 1}`);
  const priceEl = document.getElementById(`${section}-price${slotIndex + 1}`);

  if (!imgEl || !titleEl || !descEl || !priceEl) return;

  function update() {
    const item = items[current];
    imgEl.src = item.img;
    imgEl.alt = item.text;
    titleEl.textContent = item.text;
    descEl.textContent = item.text;
    priceEl.textContent = item.price;
    priceEl.title = `Price of ${item.text}`;
    current = (current + 1) % items.length;
  }

  update();
  setInterval(update, delay);
}

// 🌟 Fade on scroll
document.addEventListener("DOMContentLoaded", () => {
  for (const section in productData) {
    for (let i = 0; i < 3; i++) {
      rotateCards(section, i, 3000);
    }
  }

  const galleries = document.querySelectorAll(".product-gallery");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });
  galleries.forEach(gallery => observer.observe(gallery));
});

// 🛍️ Global cart variable
// 🛍️ Global cart variable
let cart = [];

// 🛒 Add-to-cart buttons
document.querySelectorAll(".product-card").forEach((card) => {
  const btn = document.createElement("button");
  btn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
  Object.assign(btn.style, {
    position: "absolute",
    top: "14px",
    right: "18px",
    padding: "6px 12px",
    fontSize: "0.9em",
    backgroundColor: "#d29eaf",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
  });

  btn.onclick = () => {
    const title = card.querySelector("h3")?.textContent || "";
    const priceText = card.querySelector(".price-tag")?.textContent || "0 da";
    const price = parseInt(priceText.replace(/\D/g, ""));
    const item = cart.find(p => p.title === title);
    if (item) item.qty += 1;
    else cart.push({ title, price, qty: 1 });
    alert(`${title} added to cart!`);
  };

  card.querySelector(".card-info").appendChild(btn);
});

// 🧺 Cart modal controls
function openCart() {
  document.getElementById("cart-modal").classList.remove("hidden");
  renderCart();
}
function closeCart() {
  document.getElementById("cart-modal").classList.add("hidden");
}
function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.title} — ${item.qty} × ${item.price} da 
      <button onclick="changeQty(${i}, -1)">−</button>
      <button onclick="changeQty(${i}, 1)">+</button>
      <button onclick="removeItem(${i})">🗑️</button></p>
    `;
    container.appendChild(div);
    total += item.price * item.qty;
  });

  document.getElementById("cart-total").textContent = `Total: ${total} da`;
}
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
}
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// 🧾 Inject cart into hidden inputs for Formspree
function injectCartIntoForm() {
  const container = document.getElementById("form-cart-data");
  container.innerHTML = "";

  cart.forEach((item, i) => {
    container.innerHTML += `
      <input type="hidden" name="item${i}_name" value="${item.title}" />
      <input type="hidden" name="item${i}_qty" value="${item.qty}" />
      <input type="hidden" name="item${i}_price" value="${item.price} da" />
    `;
  });

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  container.innerHTML += `<input type="hidden" name="total_price" value="${total} da" />`;
}

// 📦 Checkout modal trigger
function checkout() {
  document.getElementById("cart-modal").classList.add("hidden");
  resetPayPalContainer();
  document.getElementById("checkout-modal").classList.remove("hidden");
  renderCheckout();
}
function closeCheckout() {
  document.getElementById("checkout-modal").classList.add("hidden");
}

// 🔁 Render items in checkout preview
function renderCheckout() {
  const container = document.getElementById("checkout-items");
  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span class="item-name">${item.title}</span>
      <span class="item-qty">${item.qty}</span>
      <span class="item-price">${item.price} da</span>
    `;
    container.appendChild(div);
    total += item.qty * item.price;
  });

  document.getElementById("checkout-total").textContent = `Total: ${total} da`;

  if (typeof paypal !== "undefined") {
    setTimeout(() => {
      try {
        paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: total.toString() } }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(() => {
              cart = [];
              document.getElementById("checkout-modal").classList.add("hidden");
              document.getElementById("confirmation-modal").classList.remove("hidden");
            });
          }
        }).render('#paypal-button-container');
      } catch (err) {
        console.error("PayPal render error:", err);
        document.getElementById("paypal-button-container").innerHTML = "<p style='color:red'>Failed to load PayPal button.</p>";
      }
    }, 400);
  } else {
    document.getElementById("paypal-button-container").innerHTML = "<p style='color:red'>PayPal SDK not loaded.</p>";
  }
}

// ✉️ Final order submission via Formspree
function confirmOrder() {
  injectCartIntoForm(); // ✅ prepare hidden inputs

  const form = document.getElementById("checkout-form");
  if (form.checkValidity()) {
    form.submit(); // Submit to Formspree
    showConfirmation(); // Show confirmation modal
    cart = []; // Reset cart
  } else {
    alert("Please complete all required fields 💌");
  }
}

// 🔄 Reset PayPal container
function resetPayPalContainer() {
  const old = document.getElementById("paypal-button-container");
  if (old) old.remove();

  const newContainer = document.createElement("div");
  newContainer.id = "paypal-button-container";
  newContainer.style.marginTop = "20px";

  document.querySelector("#checkout-modal .modal-content").appendChild(newContainer);
}

// 📮 Contact modal
function openContact() {
  document.getElementById("contact-modal").classList.remove("hidden");
}
function closeContact() {
  document.getElementById("contact-modal").classList.add("hidden");
}
function closeCart() {
  const cartModal = document.getElementById("cart-modal");
  if (cartModal) {
    cartModal.classList.add("hidden");
  }
}
function cancelOrder() {
  // Reset form fields
  document.getElementById("checkout-form").reset();

  // Clear cart visuals
  document.getElementById("checkout-items").innerHTML = "";
  document.getElementById("checkout-total").textContent = "Total: 0 da";
  document.getElementById("form-cart-data").innerHTML = "";

  // Hide checkout modal
  document.getElementById("checkout-modal").classList.add("hidden");

  // Clear stored cart if needed
  cart = []; // or localStorage.removeItem("cart");
}
function togglePanel() {
  document.getElementById("sidePanel").classList.toggle("open");
}


function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    // Removed togglePanel(); so no panel changes!
  }
}
