const inputItemsForm = document.getElementById("input-items-form"); // add an event listener for submit event to get submitted data 
const inputItems = document.getElementById("input-items");          // get it's value and push to local storage 
const itemsContainer = document.getElementById("items-container");                     // you'll inject the item-list element to this
const itemList = document.getElementById("item-list");              // you'll craft this element and inject it to the itemsContainer element. also you'll add two event listener for click event to Strikethrough this item after one click (just add strike class) and delete this item after double click on this item.
const deleteItem = document.getElementById("delete-item");          // add an event listener for click event to delete the entire items element


const items = JSON.parse(localStorage.getItem('word')) || [];

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
  localStorage.setItem("word", JSON.stringify(items));
});