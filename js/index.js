let totalPrice = null;
let editIndex = null;

let headTotalPrice = document.getElementById("totalPrice");

// Upper Part is for general

let notFoundContainer = document.getElementById("notFound");

let notFoundText = document.getElementById("notFoundText");

// upper part is for not found and noti

let searchBarInput = document.getElementById("searchBar");

// Upper Part is Search Bar

let notiContainer = document.querySelector(".noti-popup");

let addItemPopupBtn = document.getElementById("addBtn");

let addItemPopupClose = document.getElementById("addItemClose");

let addItemContainer = document.querySelector(".additem-container");

let addItemNameInput = document.getElementById("addItemName");

let addImageUploadInput = document.getElementById("imageUpload");

let addPriceInput = document.getElementById("addPrice");

let addQuantityInput = document.getElementById("addQuantity");

let addItemConfirmBtn = document.getElementById("addItemBtn");

let addNotiContainer = document.getElementById("alretSameContainer");

let addNotiText = document.getElementById("alretSame");

// Upper Part is for Add Item

let editItemContainer = document.querySelector(".edititem-container");

let editItemPopupClose = document.getElementById("editItemClose");

let editItemNameInput = document.getElementById("editItemName");

let editImageUploadInput = document.getElementById("editImageUpload");

let editPriceInput = document.getElementById("editPrice");

let editQuantityInput = document.getElementById("editQuantity");

let editImg = document.getElementById("editImg");

let editConfirmBtn = document.getElementById("confirmEditBtn");

// Upper Part is for Edit Item

let editPopupBtn = document.querySelectorAll(".edit-btn");

let deleteBtn = document.querySelectorAll(".remove-btn");

// upper part is for edit

let cardContainer = document.querySelector(".cards-container");

addItemPopupBtn.addEventListener("click", () => {
  addItemContainer.classList.remove("hidden");

  addItemContainer.classList.add("active");

  notiContainer.classList.remove("hidden");
  notiContainer.classList.add("active");
});

addItemPopupClose.addEventListener("click", closeAddItemContainer);

addItemConfirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addItem();
});

function addItem() {
  let itemName = addItemNameInput.value;
  let imgLink = addImageUploadInput.value;
  let price = addPriceInput.value;
  let quantity = addQuantityInput.value;

  items.forEach((item, i) => {
    if (itemName === item.name) {
      addNotiContainer.style.display = "block";
    } else {
      addNotiContainer.style.display = "none";
    }
  });
  if (addNotiContainer.style.display == "block") {
    return;
  }

  

  let newItem = {
    name: itemName,
    image: imgLink,
    price: price,
    quantity: quantity,
  };

  items.push(newItem);
  saveItems();
  renderItems();
  updateHeadTotal();

  addItemNameInput.value = null;
  addImageUploadInput.value = null;
  addPriceInput.value = null;
  addQuantityInput.value = null;

  notiContainer.classList.remove("active");
  notiContainer.classList.add("hidden");

  addItemContainer.classList.remove("active");

  addItemContainer.classList.add("hidden");
}

// upper part is for add item

editItemPopupClose.addEventListener("click", closeEditItemContainer);

editConfirmBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  confirmEdit();
});

editImageUploadInput.addEventListener("input", () => {
    editImg.src = editImageUploadInput.value;
});

notiContainer.addEventListener("click", (e) => {
  if (e.target == notiContainer) {
    notiContainer.classList.remove("active");
    notiContainer.classList.add("hidden");

    if (addItemContainer.classList.contains("active")) {
      addItemContainer.classList.remove("active");

      addItemContainer.classList.add("hidden");
    } else if (editItemContainer.classList.contains("active")) {
      editItemContainer.classList.remove("active");
      editItemContainer.classList.add("hidden");
    } else {
      return;
    }
  }
});

// upper part is for noti container

searchBarInput.addEventListener("input", () => {
  let searchValue = searchBarInput.value.toLowerCase();

  

  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const price = card.dataset.price;
    const quantity = card.dataset.quantity;
    

    if (
      name.includes(searchValue) ||
      price.includes(searchValue) ||
      quantity.includes(searchValue)
    ) {
      card.style.display = "";
      
    } else {
      card.style.display = "none";
    }

    const anyVisibleCard = Array.from(cards).some(
      (card) => card.style.display !== "none",
    );

    if (!anyVisibleCard) {
      notFoundContainer.style.display = "block";
      notFoundText.textContent = "Item Not Found";
    } else {
      notFoundContainer.style.display = "none";
    }
  });
  
});

// upper part is for search bar

function closeAddItemContainer() {
  addItemContainer.classList.remove("active");

  addItemContainer.classList.add("hidden");

  notiContainer.classList.remove("active");
  notiContainer.classList.add("hidden");
}

function closeEditItemContainer() {
  editItemContainer.classList.remove("active");
  editItemContainer.classList.add("hidden");

  notiContainer.classList.remove("active");
  notiContainer.classList.add("hidden");
}

function removeItem(index) {
  items.splice(index, 1);
  saveItems();
  renderItems();
}

function editItemPopup(index) {
  editItemContainer.classList.remove("hidden");

  editItemContainer.classList.add("active");

  notiContainer.classList.remove("hidden");
  notiContainer.classList.add("active");

  editIndex = index;

  editItemNameInput.value = items[index].name;
  editImageUploadInput.value = items[index].image;

  editImg.src = items[index].image;
  editImg.alt = items[index].name;

  editPriceInput.value = items[index].price;
  editQuantityInput.value = items[index].quantity;
}

function confirmEdit() {
  let editedItem = {
    name: editItemNameInput.value,
    image: editImageUploadInput.value,
    price: editPriceInput.value,
    quantity: editQuantityInput.value,
  };

  items[editIndex] = editedItem;
  saveItems();
  editIndex = null;

  renderItems();
  closeEditItemContainer();
}

function createCard(name, img, price, quantity, index) {
  let totalPrice = Number(price) * Number(quantity);

  const div = document.createElement("div");
  div.classList.add("card");

  div.dataset.name = name;
  div.dataset.price = price;
  div.dataset.quantity = quantity;

  items[index].total = totalPrice;

  div.innerHTML = `
    
         
          <div class="dot-menu" onmouseenter='handleMenuPosition(this)'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-three-dots-vertical dot-icon"
              viewBox="0 0 16 16"
            >
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
              />
            </svg>

            <div class="dot-menu-toggle">


              <button class="edit-btn" onclick=" editItemPopup (${index})">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>  
                Edit
              </button>

              <button class="remove-btn" onclick="removeItem(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              
                Delete
              
              </button>
            </div>
          </div>

          <div class="card-head">
            <h2>${name}</h2>
          </div>

          <div class="card-body">
            <img
              src="${img}"
              alt="${name}"
              width="200px"
            />
          </div>

          <div class="card-footer">
            <p>Price: $${price}</p>
            <p>Quantity: ${quantity}</p>
            <p>Total: $${totalPrice}</p>
          </div>
    
    `;

  cardContainer.appendChild(div);

  return totalPrice;
}

function renderItems() {
  cardContainer.innerHTML = "";
  totalPrice = 0;
  items.forEach((e, i) => {
    createCard(e.name, e.image, e.price, e.quantity, i);
    totalPrice += items[i].total;
    updateHeadTotal();
  });

  if (items.length === 0) {
    notFoundContainer.style.display = "block";
    notFoundText.textContent = "There is no item yet!";
  } else {
    notFoundContainer.style.display = "none";
  }
}

function updateHeadTotal() {
  headTotalPrice.textContent = `$${totalPrice}`;
}

if (items.length == 0) {
  notFoundContainer.style.display = "block";
  notFoundText.textContent = "There is no item yet!";
} else {
  notFoundContainer.style.display = "none";
}

function handleMenuPosition(dotMenuElement){
  const toggle = dotMenuElement.querySelector('.dot-menu-toggle');
  const rect = dotMenuElement.getBoundingClientRect();
  const screeenWiidth = window.innerWidth;

  if(screeenWiidth - rect.right < 150){
    toggle.classList.add('pull-left')
  } else {
    toggle.classList.remove('pull-left')
  }



}

renderItems();
