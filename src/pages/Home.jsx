import React from 'react';
import Card from '../components/Card/Card';

function Home({ items,
    searchValue,
    setSearchValue,
    onAddToFavorite,
    onAddToCart,
    // cartItems,
    onChangeSearchInput,
    isLoading }) {



    //компонента карточек. 
    //вывод карточек идет по фильтрации с текста input

    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        return (isLoading
            ? [...Array(8)]
            : filteredItems).map((item, index) =>
                <Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlusClick={(obj) => onAddToCart(obj)}
                    isLoading={isLoading}
                    // cartAdded={isItemAdded(item && item.id)}
                    {...item}
                />
            );
    }

    return (
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
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;