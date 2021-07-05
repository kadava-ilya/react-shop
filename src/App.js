import React from 'react';
import axios from 'axios';
import Card from './components/Card/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';




function App() {

  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  //при нажатии на плюс у карточки в пустой массив корзины ->
  //записываем добавленный товар и отображаем в корзине
  const onAddToCart = (obj) => {

    axios.post('https://60e2e82a9103bd0017b4763d.mockapi.io/cart', obj);

    if (cartItems !== obj) {
      setCartItems(prev => [...prev, obj])
    }
  }

  //через event получаем данные из input и сетим в searchValue
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  //компонента карточек. 
  //вывод карточек идет по фильтрации с текста input
  const cardItemsArr = items
    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item, index) =>
      <Card
        key={index}
        title={item.title}
        image={item.image}
        price={item.price}
        onFavoriteClick={() => console.log("Добавили в закладки")}
        onPlusClick={onAddToCart} />);

  //Получаем данные всех кроссовок с сервера
  React.useEffect(() => {
    axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/sneakers')
      .then(res => { setItems(res.data) })
  }, []);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} />}
      <Header onCartClick={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img
              src="/img/search.svg"
              alt="Search" />
            {searchValue && <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn_remove.svg"
              alt="Clear"
            />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." type="text" />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {cardItemsArr}
        </div>
      </div>

    </div >
  );
}

export default App;
