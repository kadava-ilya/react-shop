import React from 'react';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { Route } from "react-router-dom";




function App() {

  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);

  //при нажатии на плюс у карточки в пустой массив корзины ->
  //записываем добавленный товар и отображаем в корзине
  const onAddToCart = (obj, id) => {
    if (cartItems.find(cartObj => cartObj.id === obj.id)) {
      axios.delete(`https://60e2e82a9103bd0017b4763d.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== obj.id));
    } else {
      axios.post('https://60e2e82a9103bd0017b4763d.mockapi.io/cart', obj);
      setCartItems(prev => [...prev, obj])
    }
  }

  // удаление айтемов из корзины
  const onRemoveCartItems = (id) => {
    axios.delete(`https://60e2e82a9103bd0017b4763d.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  //Добавляем на сервер лайкнутые айтемы
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://60e2e82a9103bd0017b4763d.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post('https://60e2e82a9103bd0017b4763d.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить товар в закладки");
    }
  }

  //через event получаем данные из input и сетим в searchValue
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  //Получаем данные всех кроссовок с сервера при загрузке страницы единожды
  React.useEffect(() => {
    axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/sneakers')
      .then(res => { setItems(res.data); });
    axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/cart')
      .then(res => { setCartItems(res.data) });
    axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/favorites')
      .then(res => { setFavorites(res.data) });
  }, []);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveCartItems} />}
      <Header onCartClick={() => setCartOpened(true)} />
      <Route path="/" exact>
        <Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          onChangeSearchInput={onChangeSearchInput}
        />
      </Route>

      <Route path='/favorites' exact>
        <Favorites
          items={favorites}
          onAddToFavorite={onAddToFavorite} />
      </Route>

    </div >
  );
}

export default App;
