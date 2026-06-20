const api = `https://fakestoreapi.com/products`;
const add = document.querySelector(".main-cards-card-add");
const card = document.querySelector(".main-cards");
const view = document.querySelector(".view");
const closeBtn = document.querySelector(".modal-close-btn");

function getProducts() {
  fetch(api)
    .then((res) => res.json())
    .then((data) => showProducts(data));
}
function showProducts(data) {
  card.innerHTML = "";
  data.map((item) => {
    const { id, title, price, description, category, image } = item;
    let shortTitle = title;
    if (title.length > 20) {
      shortTitle = title.slice(0, 20) + "...";
    }
    card.innerHTML += `
        <div class="main-cards-card">

            <img
              src="${image}"
              alt=""
              class="main-cards-card-img"
            />
            <div class="main-cards-card-content">
              <h4 class="main-cards-card-title">${shortTitle}</h4>
              <p class="main-cards-card-category">${category}</p>
              <div class="prices">
                <p class="main-cards-card-price underline">${((price / 100) * 75).toFixed(2)}$</p>
                <p class="main-cards-card-price">${price}$</p>
              </div>
              <div class="main-cards-card-btns">
                <button onclick="openView(${id})" class="main-cards-card-view">View</button>
                <button onclick = "addToBasket(${id})"  class="main-cards-card-add">Add</button>
              </div>
            </div>
            </div>

        `;
  });
}
getProducts();

function openView(id) {
  localStorage.setItem("selectedProductId", id);
  window.location.href = "cart.html";
}

const overlay = document.querySelector(".modal-overlay");

function getOne(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => showModalInfo(data));
}
function showModalInfo(data) {
  const { id, title, price, description, category, image } = data;
  let newDes = description;
  if (description.length > 500) {
    newDes = description.slice(0, 500) + "...";
  }
  overlay.innerHTML = `
        <div class="modal-card">
          <button onclick = "closeView(${id})" class="modal-close-btn">x</button>

          <img src="${image}" alt="${description}" class="modal-img" />
          <h3 class="modal-title">${title}</h3>
          <span class="modal-category">${category}</span>
          <p class="modal-description">${newDes}</p>
          <div class="modal-price">${price}</div>

          <button onclick = "addToBasket(${id})" class="modal-btn">Add</button>
        </div>

    `;
}

const mainImg = document.querySelector(".main-img");
const main = document.querySelector("main");

const electronic = document.querySelectorAll(".navbar-down-electronic");
const jewelery = document.querySelectorAll(".navbar-down-jewelery");
const men = document.querySelectorAll(".navbar-down-men");
const women = document.querySelectorAll(".navbar-down-women");

electronic.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (mainImg) {
      mainImg.src =
        "https://images.uzum.uz/cs5s8f7frr8f0ihuot80/t_shop_cover_high.jpg";
    }
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.category === "electronics",
        );
        showProducts(filteredData);
      });
  });
});

jewelery.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (mainImg) {
      mainImg.src = "../images/jewel.png";
    }
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.category === "jewelery",
        );
        showProducts(filteredData);
      });
  });
});

men.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (mainImg) {
      mainImg.src = "../images/mens3.png";
    }
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.category === "men's clothing",
        );
        showProducts(filteredData);
      });
  });
});

women.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (mainImg) {
      mainImg.src = "../images/womens2.png";
    }
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.category === "women's clothing",
        );
        showProducts(filteredData);
      });
  });
});

// cartts
const basketModal = document.querySelector(".basket-modal");
const basketImg = document.querySelector(".basket-img");
const basketTitle = document.querySelector(".basket-title");
const basketPrice = document.querySelector(".basket-price");
const basketQuantityText = document.querySelector(".basket-quantity");
const count = document.querySelector(".count");

let basketQuantity = 1;
let selectedProduct = null;

function addToBasket(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      selectedProduct = data;
      basketQuantity = 1;

      basketImg.src = data.image;
      basketTitle.innerHTML = data.title;
      basketPrice.innerHTML = "$" + data.price.toFixed(2);
      basketQuantityText.innerHTML = basketQuantity;

      basketModal.classList.remove("hidden");
      basketModal.classList.add("active");
    });
}

function increaseCount() {
  basketQuantity++;
  basketQuantityText.innerHTML = basketQuantity;
}

function decreaseCount() {
  if (basketQuantity > 1) {
    basketQuantity--;
    basketQuantityText.innerHTML = basketQuantity;
  }
}

function closeBasket() {
  basketModal.classList.remove("active");
  basketModal.classList.add("hidden");
}

function checkoutProduct() {
  let currentCount = Number(count.textContent);
  count.textContent = currentCount + basketQuantity;
  alert("Order confirmed successfully");
  closeBasket();
}
// Kodning eng oxiriga joylashtiring (barcha funksiyalardan pastda)
const swiper = new Swiper(".swiper", {
  // Agar do'kon banneri bo'lsa, gorizontal (horizontal) qilgan ma'qul
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Sahifalash (Nuqtachalar)
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigatsiya tugmalari
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
