import React from 'react';
import axios from 'axios';

import AppContext from '../src/context';
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
  const [isLoading, setIsLoading] = React.useState(true);

  //при нажатии на плюс у карточки в пустой массив корзины ->
  //записываем добавленный товар и отображаем в корзине
  const onAddToCart = (obj) => {
    if (cartItems.find(cartObj => Number(cartObj.id) === Number(obj.id))) {
      axios.delete(`https://60e2e82a9103bd0017b4763d.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
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
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://60e2e82a9103bd0017b4763d.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
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

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  //Получаем данные всех кроссовок с сервера при загрузке страницы единожды
  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const itemsResponse = await axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/sneakers');
      const favoritesResponse = await axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/favorites');
      const cartResponse = await axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/cart');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);

    }

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveCartItems} />}
        <Header onCartClick={() => setCartOpened(true)} />
        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            onChangeSearchInput={onChangeSearchInput}
            isLoading={isLoading}
          />
        </Route>

        <Route path='/favorites' exact>
          <Favorites />
        </Route>

      </div >
    </AppContext.Provider>
  );
}

export default App;
