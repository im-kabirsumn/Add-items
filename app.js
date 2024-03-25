const inputItemsForm = document.getElementById("input-items-form"); // add an event listener for submit event to get submitted data 
const inputItems = document.getElementById("input-items");          // get it's value and push to local storage 
const itemsContainer = document.getElementById("items-container");                     // you'll inject the item-list element to this
// const itemList = document.getElementById("item-list");              // you'll craft this element and inject it to the itemsContainer element. also you'll add two event listener for click event to Strikethrough this item after one click (just add strike class) and delete this item after double click on this item.
const deleteItem = document.getElementById("delete-item");          // add an event listener for click event to delete the entire items element


const items = JSON.parse(localStorage.getItem('items')) || [];

inputItemsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let valueItem = inputItems.value;

  if (valueItem === "") {
    return;
  }

  const item = {
    id: new Date().getTime(),
    name: valueItem,
    isComplete: false
  };

  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));

  createElement(item);
  reset();
});

const createElement = (item) => {
  const markup = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="delete"
  id="delete-item"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M6 18 18 6M6 6l12 12"
  />
</svg>
  `;
  const liElm = document.createElement("li");
  liElm.classList.add("px-2");
  liElm.textContent = item.name;
  const itemList = document.createElement("div");
  itemList.classList.add("item-list");
  itemList.innerHTML = markup;
  itemList.append(liElm);
  itemsContainer.append(itemList);
};

const reset = () => {
  inputItems.value = '';
};