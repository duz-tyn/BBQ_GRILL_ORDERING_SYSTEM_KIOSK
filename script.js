/* ==============================================
   MENU DATA
   ============================================== */
const menuData = [
  {
    id: "bbq",
    name: "BBQ",
    category: "IHAW-IHAW",
    price: 15,
    img: "BBQ SYSTEM DOCUMENT/bbq.jpg",
  },
  {
    id: "betamax",
    name: "BETAMAX",
    category: "IHAW-IHAW",
    price: 5,
    img: "BBQ SYSTEM DOCUMENT/betamax (2).jpg",
  },
  {
    id: "isaw",
    name: "ISAW",
    category: "IHAW-IHAW",
    price: 5,
    img: "BBQ SYSTEM DOCUMENT/isaw.jpg",
  },
  {
    id: "adidas",
    name: "ADIDAS",
    category: "IHAW-IHAW",
    price: 5,
    img: "BBQ SYSTEM DOCUMENT/adidas2.jpg",
  },
  {
    id: "itlog",
    name: "ITLOG",
    category: "IHAW-IHAW",
    price: 20,
    img: "BBQ SYSTEM DOCUMENT/egg.jpg",
  },
  {
    id: "hotdog",
    name: "HOTDOG",
    category: "IHAW-IHAW",
    price: 15,
    img: "BBQ SYSTEM DOCUMENT/hotdog.jpg",
  },
  {
    id: "head-chicken",
    name: "HEAD NG CHICKEN",
    category: "IHAW-IHAW",
    price: 15,
    img: "BBQ SYSTEM DOCUMENT/chickenhead2.jpg",
  },
  {
    id: "de-old",
    name: "DE OLD",
    category: "IHAW-IHAW",
    price: 25,
    img: "BBQ SYSTEM DOCUMENT/de old2.jpg",
  },
  {
    id: "pork-ear",
    name: "BALINGIT (PORK EAR)",
    category: "IHAW-IHAW",
    price: 10,
    img: "BBQ SYSTEM DOCUMENT/balingit.jpg",
  },
  {
    id: "hito",
    name: "HITO",
    category: "GRILL FISH",
    price: 120,
    img: "BBQ SYSTEM DOCUMENT/hito.jpg",
  },
  {
    id: "tilapia",
    name: "TILAPIA",
    category: "GRILL FISH",
    price: 45,
    img: (src = "BBQ SYSTEM DOCUMENT/tilapya.jpg"),
  },
  {
    id: "chicken-wings",
    name: "GRILL CHICKEN",
    category: "INIHAW NA MANOK & BABOY",
    price: 100,
    img: "BBQ SYSTEM DOCUMENT/brownchicken.jpg",
  },
  {
    id: "inasal-chicken",
    name: "CHICKEN BBQ",
    category: "INIHAW NA MANOK & BABOY",
    price: 90,
    img: "BBQ SYSTEM DOCUMENT/orangechicken.jpg",
  },
  {
    id: "liempo",
    name: "LIEMPO",
    category: "INIHAW NA MANOK & BABOY",
    price: 120,
    img: "BBQ SYSTEM DOCUMENT/liempo.jpg",
  },
  {
    id: "fried-isaw",
    name: "FRIED ISAW",
    category: "FRIED",
    price: 10,
    img: "BBQ SYSTEM DOCUMENT/fried isaw.jpg",
  },
  {
    id: "fried-chicken",
    name: "FRIED CHICKEN",
    category: "FRIED",
    price: 30,
    img: "BBQ SYSTEM DOCUMENT/fried chicken.jpg",
  },
  {
    id: "sisig-isaw",
    name: "SISIG ISAW",
    category: "FRIED",
    price: 50,
    img: "BBQ SYSTEM DOCUMENT/sisig isaw2.jpg",
  },
];

const categories = [
  "ALL",
  "BEST SELLER",
  "IHAW-IHAW",
  "GRILL FISH",
  "INIHAW NA MANOK & BABOY",
  "FRIED",
];




/* ==============================================
   LOCAL STORAGE
   ============================================== */
let orders = JSON.parse(localStorage.getItem("kiosk_orders")) || {};





/* ==============================================
   part ng navugation bar
   ============================================== */
const nav = document.getElementById("category-nav");

categories.forEach((cat) => {
  const btn = document.createElement("button");
  btn.textContent = cat;
  btn.dataset.cat = cat;
  if (cat === "ALL") btn.classList.add("active");
  btn.onclick = () => {
    document
      .querySelectorAll("#category-nav button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(cat);
  };
  nav.appendChild(btn);
});






/* ==============================================
    PRODUCT GRID YUNG MAY MGA CHOICES NA NG PRODUCTS
   ============================================== */
const grid = document.getElementById("product-grid");

function renderProducts(filter = "ALL") {
  grid.innerHTML = "";

  const filtered = menuData.filter((it) => {
    if (filter === "ALL") return true;
    if (filter === "BEST SELLER") {
      // Updated BEST SELLER items based on your new list
      return [
        "bbq",
        "betamax",
        "isaw",
        "adidas",
        "hito",
        "tilapia",
        "chicken-wings",
        "inasal-chicken",
        "fried-isaw",
        "sisig-isaw",
      ].includes(it.id);
    }
    return it.category.toLowerCase() === filter.toLowerCase();
  });

  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const media = document.createElement("div");
    media.className = "media";
    const img = document.createElement("img");
    img.src = item.img || "";
    media.appendChild(img);

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = item.name;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = "₱" + item.price;

    const action = document.createElement("div");
    action.className = "action";
    const btn = document.createElement("button");
    btn.className = "add-btn";
    btn.textContent = "Add";
    btn.onclick = () => addOrder(item);
    action.appendChild(btn);

    card.append(media, name, price, action);
    grid.appendChild(card);
  });
}

renderProducts();






/* ==============================================
   ORDER MANAGEMENT
   ============================================== */
function addOrder(item) {
  if (!orders[item.id]) orders[item.id] = { ...item, quantity: 0 };
  orders[item.id].quantity++;
  saveOrders();
  updateCartUI();
}

function changeQty(id, delta) {
  if (!orders[id]) return;
  orders[id].quantity += delta;
  if (orders[id].quantity <= 0) delete orders[id];
  saveOrders();
  updateCartUI();
}

function removeItem(id) {
  if (orders[id]) delete orders[id];
  saveOrders();
  updateCartUI();
}

function saveOrders() {
  localStorage.setItem("kiosk_orders", JSON.stringify(orders));
}







/* ==============================================
   CART / ORDER LIST
   ============================================== */
function updateCartUI() {
  const orderList = document.getElementById("order-list");
  const filterText =
    document.getElementById("order-filter")?.value.toLowerCase() || "";
  orderList.innerHTML = "";
  let total = 0,
    countItems = 0;

  for (const id in orders) {
    const o = orders[id];
    if (filterText && !o.name.toLowerCase().includes(filterText)) continue;

    const row = document.createElement("div");
    row.className = "order-row";

    const left = document.createElement("div");
    left.className = "order-left";

    const name = document.createElement("div");
    name.className = "order-name";
    name.textContent = o.name;

    const qtyWrap = document.createElement("div");
    qtyWrap.className = "qty-controls";

    const minus = document.createElement("button");
    minus.className = "qty-btn";
    minus.textContent = "-";
    minus.onclick = () => changeQty(id, -1);

    const qty = document.createElement("div");
    qty.textContent = o.quantity;
    qty.style.minWidth = "26px";
    qty.style.textAlign = "center";

    const plus = document.createElement("button");
    plus.className = "qty-btn";
    plus.textContent = "+";
    plus.onclick = () => changeQty(id, 1);

    qtyWrap.append(minus, qty, plus);
    left.append(name, qtyWrap);

    const right = document.createElement("div");
    right.className = "order-right";
    const price = document.createElement("div");
    price.textContent = "₱" + o.price * o.quantity;

    const remove = document.createElement("button");
    remove.className = "remove-btn";
    remove.textContent = "Remove";
    remove.onclick = () => removeItem(id);

    right.append(price, remove);
    row.append(left, right);
    orderList.appendChild(row);

    total += o.price * o.quantity;
    countItems += o.quantity;
  }

  document.getElementById("total-display").textContent = "₱" + total;
  document.getElementById("cart-count").textContent = countItems;
  document.getElementById("order-count").textContent = `${countItems} item${
    countItems !== 1 ? "s" : ""
  }`;
}

document
  .getElementById("order-filter")
  ?.addEventListener("input", updateCartUI);

const clearBtn = document.getElementById("clear-filter");

clearBtn.onclick = () => {
  const filterInput = document.getElementById("order-filter");
  filterInput.value = "";
  updateCartUI(); // pra ma refresh yung order list
};







/* ==============================================
   CONFIRM MODAL
   ============================================== */
function openConfirm() {
  // Check kung may order jn
  if (Object.keys(orders).length === 0) {
    alert("Please add an order first!");
    return; // stop function, wag na mag proceed pagka wlang order
  }

  const modal = document.getElementById("confirm-modal");
  const orderListDiv = document.getElementById("confirm-order-list");
  const totalDiv = document.getElementById("confirm-order-total");

  orderListDiv.innerHTML = "";
  let total = 0;

  for (const id in orders) {
    const o = orders[id];

    const row = document.createElement("div");
    row.className = "receipt-row";

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.gap = "12px";
    left.style.alignItems = "center";

    const name = document.createElement("div");
    name.textContent = o.name;
    name.style.fontWeight = "700";

    const qtyWrap = document.createElement("div");
    qtyWrap.className = "qty-controls";

    const minus = document.createElement("button");
    minus.className = "qty-btn";
    minus.textContent = "-";
    minus.onclick = () => {
      changeQty(id, -1);
      openConfirm();
    };

    const qty = document.createElement("div");
    qty.textContent = o.quantity;
    qty.style.minWidth = "26px";
    qty.style.textAlign = "center";

    const plus = document.createElement("button");
    plus.className = "qty-btn";
    plus.textContent = "+";
    plus.onclick = () => {
      changeQty(id, 1);
      openConfirm();
    };

    qtyWrap.append(minus, qty, plus);
    left.append(name, qtyWrap);

    const right = document.createElement("div");
    right.textContent = "₱" + o.price * o.quantity;
    right.style.fontWeight = "700";

    row.append(left, right);
    orderListDiv.appendChild(row);

    total += o.price * o.quantity;
  }

  totalDiv.textContent = "₱" + total;
  modal.style.display = "flex";
}




function finalizeOrder() {
  // 1. Buksan ang receipt sa bagong tab dine
  openReceiptWindow();

  // 2. I-clear ang orders pagka finalise
  orders = {};
  saveOrders();
  updateCartUI();

  // 3. Isara ang modal dide sa section nto
  document.getElementById("confirm-modal").style.display = "none";
}

updateCartUI();

function cancelAll() {
  const modal = document.getElementById("confirm-modal");
  modal.style.display = "none";
}
   // ==============================================
   // RECEIPT
   // ==============================================

function openReceiptWindow() {
  let receiptContent = `
    <html>
    <head>
      <title>Receipt</title>
      <style>
        body { 
          font-family: monospace; 
          padding: 20px; 
          background: #fdf6e3; 
          color: #000;
        }
        h2 { text-align: center; }
        .receipt-row { display: flex; justify-content: space-between; border-bottom: 1px dashed #999; padding: 4px 0; }
        .total { font-weight: 900; margin-top: 10px; display: flex; justify-content: space-between; }
      </style>
    </head>
    <body>
      <h2>BBQ ORDER RECEIPT</h2>
      ${Object.values(orders)
        .map(
          (o) => `
        <div class="receipt-row">
          <div>${o.name} x ${o.quantity}</div>
          <div>₱${o.price * o.quantity}</div>
        </div>
      `
        )
        .join("")}
      <div class="total">
        <div>Total</div>
        <div>₱${Object.values(orders).reduce(
          (a, b) => a + b.price * b.quantity,
          0
        )}</div>
      </div>
      <h2>THANK YOU COME AGAIN!</h2>
    </body>
    </html>
  `;

  let receiptWindow = window.open("", "_blank", "width=400,height=600");
  receiptWindow.document.write(receiptContent);
  receiptWindow.document.close();
}
