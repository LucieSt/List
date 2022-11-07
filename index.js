import { ShoppingList } from './ShoppingList/index.js';

document.querySelector('#lists').append(
  ShoppingList({ day: 'mon', dayName: 'Pondělí' }),
  ShoppingList({ day: 'tue', dayName: 'Úterý' }),
);