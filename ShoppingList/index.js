import { ShoppingItem } from "../ShoppingItem/index.js";

export const ShoppingList = (props) => {
  const { day, dayName, items } = props;

  const element = document.createElement('div');
  element.classList.add('shopping-list');
  element.innerHTML = `

    <h2>Pridani nove polozky</h2>
    <form>
      <h3>Nazev polozky</h3><input type="text" id="name"></input>
      <h3>Mnozstvi</h3><input type="number" id="amount"></input>
      <h3>Jednotka</h3><input type="text" id="unit"></input><br/><br/>
      <button id="btn">Pridat</button>
    </form>

    <h2>${dayName}</h2>
    <ul class="shopping-list__items"></ul>
  `;
  
  if (items === undefined) {
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/weeks/6/days/${day}`)
      .then((response) => response.json())
      .then((data) => {
        element.replaceWith(ShoppingList({
          day: day,
          dayName: dayName,
          items: data.results,
        }));
      });
  } else {
    const ulElement = element.querySelector('ul');
    ulElement.append(...items.map((item) => ShoppingItem(item)));
  }

  return element;
};