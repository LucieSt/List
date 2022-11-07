export const ShoppingItem = (props) => {
  const { id, product, amount, unit, done } = props;

  let checkClass = '';
  if (done) {
    checkClass = 'item__btn-done--check';
  }

  const element = document.createElement('li');
  element.classList.add('item');
  element.innerHTML = `
    <div class="item__name">${product}</div>
    <div class="item__amount"><input type="number" value=${amount}></input> ${unit}</div>
    <button class="item__btn-done ${checkClass}"></button>
  `;

  const inputElm = element.querySelector('input');
  inputElm.addEventListener('change', () => {
    console.log(inputElm.value);
    const newAmount = parseInt(inputElm.value);
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/weeks/6/days/mon/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: newAmount }),
    }).then((response) => response.json())
      .then((data) => element.replaceWith(ShoppingItem(data.results)));
  });

  element.querySelector('button').addEventListener('click', () => {
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/weeks/6/days/mon/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: !done }),
    }).then((response) => response.json())
      .then((data) => element.replaceWith(ShoppingItem(data.results)));
  });

  return element;
};