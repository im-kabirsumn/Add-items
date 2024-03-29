const inputItemsForm = document.getElementById("input-items-form"); // add an event listener for submit event to get submitted data 
const inputItems = document.getElementById("input-items");          // get it's value and push to local storage 
const itemsContainer = document.getElementById("items-container");                     // you'll inject the item-list element to this
// const itemList = document.createElement("div");              // you'll craft this element and inject it to the itemsContainer element. also you'll add two event listener for click event to Strikethrough this item after one click (just add strike class) and delete this item after double click on this item.



const items = JSON.parse(localStorage.getItem('items')) || [];

items.map((item) => {
  createElement(item);
});
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
  inputItemsForm.reset();
});

function createElement(item) {
  const li = document.createElement("li");
  li.textContent = item.name;
  li.appendChild(createButton("delete-icon"));
  li.className = "item-list";
  itemsContainer.append(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  button.append(createIcon("fa-solid fa-xmark"));
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}



