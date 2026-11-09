
const bikes = [
{
  id: 1,
  name: "TVS Raider 125",
  brand: "TVS",
  category: "naked",
  price: 144900,
  cc: "124.8 CC",
  power: "12.9 PS",
  tag: "CITY FAVORITE",
  year: 2022,
  rating: 4.8,
 img: "https://commons.wikimedia.org/wiki/Special:FilePath/TVS_Raider_125.jpg",
  desc: "A sporty 125cc commuter motorcycle featuring modern styling, LED lighting, a digital instrument cluster and comfortable everyday usability."
},

  {
    id: 2,
    name: "Bajaj Pulsar NS160",
    brand: "Bajaj",
    category: "naked",
    price: 245000,
    cc: "160.3 CC",
    power: "15.5 PS",
    tag: "STREET FAVORITE",
    year: 2021,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=85",
    desc: "A sporty naked motorcycle with muscular styling and a performance-focused character."
  },

  {
    id: 3,
    name: "TVS Apache RTR 160 4V",
    brand: "TVS",
    category: "sport",
    price: 248000,
    cc: "159.7 CC",
    power: "16.8 PS",
    tag: "SPORT FAVORITE",
    year: 2022,
    rating: 4.9,
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/TVS_Apache_RTR_160_4V.jpg",
    desc: "A sporty street motorcycle featuring aggressive styling and a performance-oriented riding experience."
  },

  {
    id: 4,
    name: "TVS Apache RTR 160 2V",
    brand: "TVS",
    category: "sport",
    price: 200000,
    cc: "159.7 CC",
    power: "15.2 PS",
    tag: "CITY FAVORITE",
    year: 2019,
    rating: 4.7,
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/Apache_RTR_160.jpg",
    desc: "A well-known street motorcycle designed for daily commuting and comfortable city rides."
  },

  {
    id: 5,
    name: "Yamaha FZS FI V2",
    brand: "Yamaha",
    category: "naked",
    price: 235000,
    cc: "149 CC",
    power: "13.2 PS",
    tag: "STREET ICON",
    year: 2019,
    rating: 4.8,
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/Fzsb6v3.jpg",
    desc: "A stylish street motorcycle with a muscular fuel tank, comfortable riding position and reliable performance."
  },

  {
    id: 6,
    name: "Honda CB Hornet 160R",
    brand: "Honda",
    category: "naked",
    price: 230000,
    cc: "162.71 CC",
    power: "15.09 PS",
    tag: "PREMIUM STREET",
    year: 2020,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=900&q=85",
    desc: "A muscular street motorcycle with sharp styling and a comfortable riding experience."
  },

  {
    id: 7,
    name: "Suzuki Gixxer 155",
    brand: "Suzuki",
    category: "sport",
    price: 225000,
    cc: "155 CC",
    power: "14.1 PS",
    tag: "SPORT DESIGN",
    year: 2021,
    rating: 4.8,
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/Suzuki_Gixxer_155cc_DD_black.jpg",
    desc: "A popular sporty motorcycle with attractive styling, balanced performance and everyday usability."
  },

  {
    id: 8,
    name: "Suzuki Gixxer SF 155",
    brand: "Suzuki",
    category: "sport",
    price: 260000,
    cc: "155 CC",
    power: "14.1 PS",
    tag: "FULL FAIRING",
    year: 2020,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=85",
    desc: "A fully faired sports motorcycle with aerodynamic styling and a sporty riding character."
  }
];


const money = n =>
  "৳" + Number(n).toLocaleString("en-BD");

const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  [...document.querySelectorAll(selector)];

let activeCategory = "all";
let searchTerm = "";
let sortMode = "featured";

let cart = JSON.parse(
  localStorage.getItem("apex_cart") || "[]"
);

let wishlist = JSON.parse(
  localStorage.getItem("apex_wishlist") || "[]"
);

const productGrid = $("#productGrid");



function saveState() {

  localStorage.setItem(
    "apex_cart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "apex_wishlist",
    JSON.stringify(wishlist)
  );

  updateBadges();

}



function toast(message, type = "success") {

  const el = document.createElement("div");

  el.className =
    "toast " + (type === "error" ? "error" : "");

  el.textContent = message;

  $("#toastRegion").append(el);

  setTimeout(() => {

    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";

    setTimeout(() => el.remove(), 250);

  }, 2600);

}



function filteredBikes() {

  let list = bikes.filter(b => {

    const categoryMatch =
      activeCategory === "all" ||
      b.category === activeCategory;

    const searchMatch =
      `${b.name} ${b.brand} ${b.category}`
        .toLowerCase()
        .includes(searchTerm);

    return categoryMatch && searchMatch;

  });

  if (sortMode === "low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sortMode === "high") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sortMode === "name") {
    list.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  return list;

}



function renderProducts() {

  const list = filteredBikes();

  $("#resultsCount").textContent =
    `Showing ${list.length} motorcycle${list.length === 1 ? "" : "s"}`;

  $("#emptyState").classList.toggle(
    "hidden",
    list.length !== 0
  );

  productGrid.innerHTML = list.map((b, i) => `

    <article class="product-card"
      style="animation-delay:${i * 55}ms">

      <div class="product-image">

        <img
          src="${b.img}"
          alt="${b.name}"
          loading="lazy"
        >

        <span class="product-tag">
          ${b.tag}
        </span>

        <button
          class="wish-btn ${wishlist.includes(b.id) ? "active" : ""}"
          data-wish="${b.id}"
          aria-label="Add ${b.name} to wishlist">

          <i data-lucide="heart"></i>

        </button>

      </div>

      <div class="product-info">

        <div class="product-category">
          ${b.brand} / ${b.category}
        </div>

        <h3>${b.name}</h3>

        <div class="product-meta">

          <span>
            <i data-lucide="gauge"></i>
            ${b.cc}
          </span>

          <span>
            <i data-lucide="zap"></i>
            ${b.power}
          </span>

          <span>★ ${b.rating}</span>

        </div>

        <div class="product-bottom">

          <div class="price">

            ${money(b.price)}

            <small>ESTIMATED PRICE</small>

          </div>

          <div class="card-actions">

            <button
              class="mini-btn"
              data-quick="${b.id}"
              aria-label="Quick view">

              <i data-lucide="eye"></i>

            </button>

            <button
              class="mini-btn"
              data-add="${b.id}"
              aria-label="Add to bag">

              <i data-lucide="shopping-bag"></i>

            </button>

          </div>

        </div>

      </div>

    </article>

  `).join("");

  if (window.lucide) {
    lucide.createIcons();
  }

}



function updateBadges() {

  $("#cartCount").textContent =
    cart.reduce((n, x) => n + x.qty, 0);

  $("#wishCount").textContent =
    wishlist.length;

}


function addToCart(id) {

  const b = bikes.find(x => x.id === id);

  const found = cart.find(x => x.id === id);

  if (found) {
    found.qty++;
  } else {
    cart.push({
      id,
      qty: 1
    });
  }

  saveState();

  renderCart();

  toast(`${b.name} added to your bag`);

}



function toggleWish(id) {

  const b = bikes.find(x => x.id === id);

  if (wishlist.includes(id)) {

    wishlist = wishlist.filter(x => x !== id);

    toast("Removed from wishlist");

  } else {

    wishlist.push(id);

    toast(`${b.name} saved to wishlist`);

  }

  saveState();

  renderProducts();

  renderWishlist();

}




function renderCart() {

  const wrap = $("#cartItems");

  if (!cart.length) {

    wrap.innerHTML = `
      <div class="drawer-empty">
        Your bag is waiting for a machine.<br>
        Explore the collection to get started.
      </div>
    `;

  } else {

    wrap.innerHTML = cart.map(item => {

      const b = bikes.find(x => x.id === item.id);

      return `

        <div class="drawer-item">

          <img src="${b.img}" alt="${b.name}">

          <div>

            <h4>${b.name}</h4>

            <small>
              ${item.qty} × ${money(b.price)}
            </small>

            <p>
              ${money(b.price * item.qty)}
            </p>

          </div>

          <button
            class="remove-item"
            data-remove="${b.id}"
            aria-label="Remove">

            <i data-lucide="trash-2"></i>

          </button>

        </div>

      `;

    }).join("");

  }

  const subtotal = cart.reduce((sum, item) => {

    const bike = bikes.find(b => b.id === item.id);

    return sum + bike.price * item.qty;

  }, 0);

  $("#cartSubtotal").textContent =
    money(subtotal);

  if (window.lucide) {
    lucide.createIcons();
  }

}



function renderWishlist() {

  const wrap = $("#wishItems");

  if (!wishlist.length) {

    wrap.innerHTML = `
      <div class="drawer-empty">
        No saved machines yet.<br>
        Tap the heart on a motorcycle you like.
      </div>
    `;

    return;

  }

  wrap.innerHTML = wishlist.map(id => {

    const b = bikes.find(x => x.id === id);

    return `

      <div class="drawer-item">

        <img src="${b.img}" alt="${b.name}">

        <div>

          <h4>${b.name}</h4>

          <small>
            ${b.category.toUpperCase()}
          </small>

          <p>${money(b.price)}</p>

        </div>

        <button
          class="remove-item"
          data-unwish="${b.id}"
          aria-label="Remove">

          <i data-lucide="x"></i>

        </button>

      </div>

    `;

  }).join("");

  if (window.lucide) {
    lucide.createIcons();
  }

}




function openDrawer(id) {

  closeModal();

  $("#overlay").classList.add("open");

  $(id).classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeDrawers() {

  $$(".drawer").forEach(d => {
    d.classList.remove("open");
  });

  $("#overlay").classList.remove("open");

  document.body.style.overflow = "";

}




function openQuick(id) {

  const b = bikes.find(x => x.id === id);

  $("#quickContent").innerHTML = `

    <div class="quick-layout">

      <img
        src="${b.img}"
        alt="${b.name}"
      >

      <div>

        <small>
          ${b.brand} · ${b.category.toUpperCase()} · ${b.year}
        </small>

        <h2>${b.name}</h2>

        <div class="product-meta">

          <span>${b.cc}</span>

          <span>${b.power}</span>

          <span>★ ${b.rating}</span>

        </div>

        <p>${b.desc}</p>

        <div class="quick-price">
          ${money(b.price)}
        </div>

        <button
          class="btn btn-primary"
          data-add="${b.id}">

          Add to bag

          <i data-lucide="shopping-bag"></i>

        </button>

      </div>

    </div>

  `;

  $("#quickModal").classList.add("open");

  document.body.style.overflow = "hidden";

  if (window.lucide) {
    lucide.createIcons();
  }

}


function closeModal() {

  $("#quickModal").classList.remove("open");

  if (!$$(".drawer.open").length) {
    document.body.style.overflow = "";
  }

}



function refresh() {

  renderProducts();

  renderCart();

  renderWishlist();

  updateBadges();

}




$("#categoryTabs").addEventListener("click", e => {

  const btn = e.target.closest("[data-category]");

  if (!btn) return;

  activeCategory = btn.dataset.category;

  $$(".filter-chip").forEach(x => {

    x.classList.toggle(
      "selected",
      x === btn
    );

  });

  renderProducts();

});



$("#productSearch").addEventListener("input", e => {

  searchTerm = e.target.value
    .trim()
    .toLowerCase();

  renderProducts();

});



$("#sortSelect").addEventListener("change", e => {

  sortMode = e.target.value;

  renderProducts();

});


$("#clearFilters").addEventListener("click", () => {

  activeCategory = "all";

  searchTerm = "";

  sortMode = "featured";

  $("#productSearch").value = "";

  $("#sortSelect").value = "featured";

  $$(".filter-chip").forEach(x => {

    x.classList.toggle(
      "selected",
      x.dataset.category === "all"
    );

  });

  renderProducts();

});


$("#resetSearch").addEventListener("click", () => {

  $("#clearFilters").click();

});



document.addEventListener("click", e => {

  const add = e.target.closest("[data-add]");

  if (add) {

    addToCart(Number(add.dataset.add));

    return;

  }


  const wish = e.target.closest("[data-wish]");

  if (wish) {

    toggleWish(Number(wish.dataset.wish));

    return;

  }


  const quick = e.target.closest("[data-quick]");

  if (quick) {

    openQuick(Number(quick.dataset.quick));

    return;

  }


  const remove = e.target.closest("[data-remove]");

  if (remove) {

    cart = cart.filter(
      x => x.id !== Number(remove.dataset.remove)
    );

    saveState();

    renderCart();

    toast("Item removed");

    return;

  }


  const unwish = e.target.closest("[data-unwish]");

  if (unwish) {

    toggleWish(Number(unwish.dataset.unwish));

    return;

  }

});




$("#cartOpen").addEventListener("click", () => {

  openDrawer("#cartDrawer");

});


$("#wishlistOpen").addEventListener("click", () => {

  openDrawer("#wishDrawer");

});


$("#overlay").addEventListener("click", closeDrawers);


$$(".close-drawer").forEach(button => {

  button.addEventListener("click", closeDrawers);

});


$(".modal-close").addEventListener("click", closeModal);


$("#quickModal").addEventListener("click", e => {

  if (e.target.id === "quickModal") {
    closeModal();
  }

});



document.addEventListener("keydown", e => {

  if (e.key === "Escape") {

    closeDrawers();

    closeModal();

  }

});



$("#checkoutBtn").addEventListener("click", () => {

  if (!cart.length) {

    toast("Your bag is empty", "error");

    return;

  }

  toast(
    "Demo checkout: connect a payment and order API to go live."
  );

});


$("#menuToggle").addEventListener("click", () => {

  $(".desktop-nav").classList.toggle("show");

});


$$(".desktop-nav a").forEach(a => {

  a.addEventListener("click", () => {

    $(".desktop-nav").classList.remove("show");

  });

});



$$(".back-top").forEach(a => {

  a.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});


const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


$$(".reveal").forEach(el => {

  observer.observe(el);

});



const countObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const el = entry.target;

      const target = Number(el.dataset.count);

      let start = 0;

      const step = Math.max(
        1,
        Math.ceil(target / 45)
      );

      const timer = setInterval(() => {

        start = Math.min(
          target,
          start + step
        );

        el.textContent = start;

        if (start >= target) {
          clearInterval(timer);
        }

      }, 28);

      countObserver.unobserve(el);

    });

  },
  {
    threshold: 0.5
  }
);


$$("[data-count]").forEach(el => {

  countObserver.observe(el);

});




if (window.lucide) {
  lucide.createIcons();
}

refresh();