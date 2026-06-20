const overlay = document.querySelector(".modal-overlay");
const productId = localStorage.getItem("selectedProductId");

if (productId) {
  getOne(productId);
}

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
  if (overlay) {
    overlay.innerHTML = `
        <div class="modal-card">
          <button onclick="history.back()" class="modal-close-btn">x</button>
          <img src="${image}" alt="${description}" class="modal-img" />
          <h3 class="modal-title">${title}</h3>
          <span class="modal-category">${category}</span>
          <p class="modal-description">${newDes}</p>
          <div class="modal-price">$${price}</div>
          <button onclick="addToBasket(${id})" class="modal-btn">Add</button>
        </div>
    `;
  }
}

function addToBasket(id) {
  alert("Added");
}
