import React from 'react';
import Card from './components/Card/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  {
    name: "Мужские Кроссовки Nike Blazer Mid Suede",
    image: '/img/sneakers/1.jpg',
    price: 2999,
  },
  {
    name: "Мужские Кроссовки Nike Air Max 270",
    image: '/img/sneakers/2.jpg',
    price: 5999,
  },
  {
    name: "Мужские Кроссовки Nike Blazer Mid Suede",
    image: '/img/sneakers/3.jpg',
    price: 2999,
  },
  {
    name: "Кроссовки Puma X Aka Boku Future Rider",
    image: '/img/sneakers/4.jpg',
    price: 2799,
  },
  {
    name: "Мужские Кроссовки Under Armour Curry 8",
    image: '/img/sneakers/5.jpg',
    price: 3299,
  },
  {
    name: "Мужские Кроссовки Nike Kyrie 7",
    image: '/img/sneakers/6.jpg',
    price: 3499,
  },
  {
    name: "Мужские Кроссовки Jordan Air Jordan 11",
    image: '/img/sneakers/7.jpg',
    price: 3999,
  },
  {
    name: "Мужские Кроссовки Nike LeBron XVIII",
    image: '/img/sneakers/8.jpg',
    price: 3499,
  },
  {
    name: "Мужские Кроссовки Nike Lebron XVIII Low",
    image: '/img/sneakers/9.jpg',
    price: 4299,
  },
  {
    name: "Мужские Кроссовки Nike Blazer Mid Suede",
    image: '/img/sneakers/1.jpg',
    price: 2999,
  },
  {
    name: "Кроссовки Puma X Aka Boku Future Rider",
    image: '/img/sneakers/4.jpg',
    price: 2799,
  },
  {
    name: "Мужские Кроссовки Nike Kyrie Flytrap IV",
    image: '/img/sneakers/12.jpg',
    price: 4999,
  },

]

const newArr = arr.map((value) =>
  <Card name={value.name}
    image={value.image}
    price={value.price}
    onFavoriteClick={() => console.log("Добавили в закладки")}
    onPlusClick={() => console.log("Купили")} />);

function App() {

  const [cartOpened, setCartOpened] = React.useState(false);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => { setCartOpened(false) }} />}
      <Header onCartClick={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." type="text" />
          </div>
        </div>
        <div className="d-flex justify-between flex-wrap">
          {newArr}
        </div>
      </div>

    </div >
  );
}

export default App;
