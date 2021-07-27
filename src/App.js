import React from 'react';
import axios from 'axios';

import AppContext from '../src/context';
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { Route } from "react-router-dom";
import Orders from './pages/Orders';


function App() {

  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  //при нажатии на плюс у карточки в пустой массив корзины ->
  //записываем добавленный товар и отображаем в корзине
  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find(cartObj => Number(cartObj.parentId) === Number(obj.id))) {

        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        await axios.delete(`https://60e2e82a9103bd0017b4763d.mockapi.io/cart/${obj.id}`);
      } else {
        await axios.post('https://60e2e82a9103bd0017b4763d.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj])
      }
    } catch (error) {
      alert('Товар не был добавлен в корзину')
      console.error(error)
    }
  }

  // удаление айтемов из корзины
  const onRemoveCartItems = (id) => {
    try {
      axios.delete(`https://60e2e82a9103bd0017b4763d.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Товар не был удалён из корзины')
      console.error(error)
    }
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
      console.error(error);
    }
  }

  //через event получаем данные из input и сетим в searchValue
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  //пробегаем по массиву в корщине и вытискиваем parentId 
  //и сравниваем его с реальным id из карточки
  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  //Получаем данные всех кроссовок с сервера при загрузке страницы единожды
  React.useEffect(() => {

    async function fetchData() {
      try {
        setIsLoading(true);

        //рефакторинг вместо трёх запросов ниже отправляем один с 3 промисами
        const [itemsResponse, favoritesResponse, cartResponse] = await Promise.all([
          axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/sneakers'),
          axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/favorites'),
          axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/cart')
        ]);

        // const itemsResponse = await axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/sneakers');
        // const favoritesResponse = await axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/favorites');
        // const cartResponse = await axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/cart');

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      }
      catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error)
      }
    }

    fetchData();

  }, []);




  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveCartItems} opened={cartOpened} />
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

        <Route path='/orders' exact>
          <Orders />
        </Route>

      </div >
    </AppContext.Provider>
  );
}

export default App;
