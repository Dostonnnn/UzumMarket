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
                <button  class="main-cards-card-add">Add</button>
              </div>
            </div>
            </div>

        `;
  });
}
getProducts();

function openView(id) {
  view.classList.remove("hidden");
  getOne(id);
}
function closeView() {
  view.classList.remove("active");
  view.classList.add("hidden");
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

          <button class="modal-btn">Add</button>
        </div>

    `;
  view.classList.add("active");
}

const electronic = document.querySelector(".navbar-down-electronic");
const jewelery = document.querySelector(".navbar-down-jewelery");
const men = document.querySelector(".navbar-down-men");
const women = document.querySelector(".navbar-down-women");
const refresh = document.querySelector(".navbar-down-refresh");
electronic.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter(
        (item) => item.category === "electronics",
      );
      showProducts(filteredData);
    });
});

jewelery.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter((item) => item.category === "jewelery");
      showProducts(filteredData);
    });
});

men.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter(
        (item) => item.category === "men's clothing",
      );
      showProducts(filteredData);
    });
});

women.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter(
        (item) => item.category === "women's clothing",
      );
      showProducts(filteredData);
    });
});
refresh.addEventListener("click", (e) => {
  refreshPage();
});
function refreshPage() {
  window.location.reload();
}

function addProduct() {}
