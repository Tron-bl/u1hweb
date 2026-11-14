const products = [
    { id: 1, name: "Zapatillas Sprint Pro", category: "Calzado", price: 189900, old: 219900, emoji: "👟", badge: "MÁS VENDIDO" },
    { id: 2, name: "Balón Fútbol Elite", category: "Balones", price: 79900, old: 0, emoji: "⚽", badge: "" },
    { id: 3, name: "Gafas deportivas", category: "Accesorios", price: 45900, old: 59900, emoji: "🥽", badge: "-20%" },
    { id: 4, name: "Camiseta Training", category: "Uniformes", price: 69900, old: 0, emoji: "👕", badge: "NUEVO" },
    { id: 5, name: "Guantes de gimnasio", category: "Entrenamiento", price: 38900, old: 0, emoji: "🧤", badge: "" },
    { id: 6, name: "Balón de baloncesto", category: "Balones", price: 89900, old: 99900, emoji: "🏀", badge: "" },
    { id: 7, name: "Uniforme deportivo", category: "Uniformes", price: 119900, old: 139900, emoji: "🥋", badge: "OFERTA" },
    { id: 8, name: "Botella deportiva", category: "Accesorios", price: 29900, old: 0, emoji: "🧴", badge: "" }
];
let cart = [];
let activeCategory = "Todos";
const money = n => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
const grid = document.getElementById("productGrid");
function renderProducts() {
    let list = products.filter(p => (activeCategory === "Todos" || p.category === activeCategory) && (`${p.name} ${p.category}`.toLowerCase().includes(document.getElementById("searchInput").value.toLowerCase())));
    const sort = document.getElementById("sortSelect").value;
    if (sort === "low") list.sort((a, b) => a.price - b.price); if (sort === "high") list.sort((a, b) => b.price - a.price);
    grid.innerHTML = list.map(p => `<article class="product-card"><div class="product-visual">${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}<span class="product-emoji">${p.emoji}</span></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="price-row"><span class="price">${money(p.price)}</span>${p.old ? `<span class="old-price">${money(p.old)}</span>` : ""}</div><button class="add-btn" data-add="${p.id}">＋ AGREGAR AL CARRITO</button></div></article>`).join("");
    document.getElementById("emptyState").hidden = list.length !== 0;
}
function renderCart() {
    document.getElementById("cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById("cartTotal").textContent = money(cart.reduce((s, i) => s + i.price * i.qty, 0));
    const area = document.getElementById("cartItems");
    area.innerHTML = cart.length ? cart.map(i => `<div class="cart-line"><div><strong>${i.name}</strong><small>${money(i.price)} · ${money(i.price * i.qty)}</small></div><div class="qty-controls"><button data-dec="${i.id}" aria-label="Restar">−</button><span>${i.qty}</span><button data-inc="${i.id}" aria-label="Sumar">+</button><button data-remove="${i.id}" aria-label="Eliminar">×</button></div></div>`).join("") : '<p class="muted">Tu carrito está vacío.</p>';
}
grid.addEventListener("click", e => { const id = Number(e.target.dataset.add); if (!id) return; const p = products.find(x => x.id === id); const found = cart.find(x => x.id === id); found ? found.qty++ : cart.push({ ...p, qty: 1 }); renderCart(); e.target.textContent = "✓ AGREGADO"; setTimeout(() => { if (e.target) e.target.textContent = "＋ AGREGAR AL CARRITO" }, 900) });
document.getElementById("cartItems").addEventListener("click", e => { let id = Number(e.target.dataset.inc || e.target.dataset.dec || e.target.dataset.remove); if (!id) return; let item = cart.find(x => x.id === id); if (e.target.dataset.inc) item.qty++; else if (e.target.dataset.dec) item.qty--; else item.qty = 0; cart = cart.filter(x => x.qty > 0); renderCart() });
document.querySelectorAll(".category").forEach(btn => btn.addEventListener("click", () => { document.querySelector(".category.active").classList.remove("active"); btn.classList.add("active"); activeCategory = btn.dataset.category; renderProducts() }));
document.getElementById("searchInput").addEventListener("input", renderProducts);
document.getElementById("sortSelect").addEventListener("change", renderProducts);
const drawer = document.getElementById("cartDrawer"), backdrop = document.getElementById("cartBackdrop");
function toggleCart(open) { drawer.classList.toggle("open", open); backdrop.classList.toggle("show", open); drawer.setAttribute("aria-hidden", String(!open)) }
document.getElementById("openCart").addEventListener("click", () => toggleCart(true)); document.getElementById("closeCart").addEventListener("click", () => toggleCart(false)); backdrop.addEventListener("click", () => toggleCart(false));
document.getElementById("checkoutBtn").addEventListener("click", () => { if (!cart.length) { alert("Tu carrito está vacío."); return } alert("¡Gracias! Esta demostración no procesa pagos reales."); cart = []; renderCart(); toggleCart(false) });
document.getElementById("themeToggle").addEventListener("click", () => document.body.classList.toggle("light"));
document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => document.getElementById("mainNav").classList.remove("open")));
document.getElementById("contactForm").addEventListener("submit", e => { e.preventDefault(); document.getElementById("formMessage").textContent = "¡Mensaje listo! Esta demo no envía datos a un servidor."; e.target.reset() });
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts(); renderCart();
