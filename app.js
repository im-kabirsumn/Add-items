"use strict";

const inputItemsForm = document.getElementById("input-items-form");
const inputItems = document.getElementById("input-items");
const itemsContainer = document.getElementById("items-container");
const addItem = document.getElementById("add-item");




// Event Listeners
inputItemsForm.addEventListener("submit", onSubmit);
addItem.addEventListener("click", onSubmit);
document.addEventListener("DOMContentLoaded", displayLocalStorage);
itemsContainer.addEventListener("click", deleteItem);
itemsContainer.addEventListener("click", completeItem);

// onSubmit & it's allies
function onSubmit(e) {
  e.preventDefault();
  let inputValue = inputItems.value;

  const item = {
    id: new Date().getTime(),
    name: inputValue,
    isComplete: false
  };

  addItemToLocalStorage(item);
  addItemToDisplay(item);

  inputItemsForm.reset();

}

// onSubmit has two function calls. addItemToLocalStorage is one of them
function addItemToLocalStorage(item) {
  const items = createLocalStorageItem(); // Find it in Utility functions
  items.push(item);
  localStorage.setItem("localStorageItem", JSON.stringify(items));
}

// onSubmit has two function calls. addItemToDisplay is one of them & onSubmit end here
function addItemToDisplay(item) {
  const li = createLi(item); // Find it in Utility functions
  itemsContainer.appendChild(li);
}

// Show Local Storage items added before on initial load
function displayLocalStorage() {
  const localStorageItems = createLocalStorageItem();

  localStorageItems.map((item) => {
    addItemToDisplay(item);
  });

}

function deleteItem(e) {
  e.preventDefault();

  if (e.target.classList.contains("delete-icon")) {
    if (e.target.nodeName === "svg") {
      e.target.parentElement.remove();
    }
    if (e.target.nodeName === "path") {
      e.target.parentElement.parentElement.remove();
    }

  }
}

function completeItem(e) {
  e.preventDefault();

  let target = e.target;
  let id = target.getAttribute("id");

  if (target.classList.contains("item-list")) {
    localStorageItems.map((item) => {
      if (Number(id) === item.id) {
        item.isComplete = true;
        target.className = "strike";
        localStorage.removeItem(item);
      }

    });
  }
}


// Utility functions 
function createLocalStorageItem() {
  const items = JSON.parse(localStorage.getItem("localStorageItem")) || [];
  return items;
}

function createLi(item) {
  const li = document.createElement("li");
  li.innerHTML = ` <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="delete-icon"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M6 18 18 6M6 6l12 12"
    class="delete-icon"
  />
</svg>`;
  li.appendChild(document.createTextNode(item.name));
  item.isComplete ? li.className = "strike" : li.className = "item-list";
  li.setAttribute("id", `${item.id}`);
  return li;
}