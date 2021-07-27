import axios from 'axios';
import React from 'react';
import Card from '../components/Card/Card';
import AppContext from '../context';

function Orders() {
    const { onAddToFavorite, onAddToCart } = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        //асинхронная анонимная ф-я для получения ордеров с сервера
        (async () => {
            try {
                const { data } = await axios.get('https://60e2e82a9103bd0017b4763d.mockapi.io/orders');
                //в reduce передаём prev и obj, в первый массив записываем всё,
                //что есть в prev и добавляем obj.items
                //второй пустой, куда записываем всё
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов');
                console.error(error);
            }
        })()
    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
                {isLoading
                    ? [...Array(8)]
                    : orders
                        .map((item, index) => {
                            <Card
                                key={index}
                                isLoading={isLoading}
                                {...item} />
                        })
                }
            </div>
        </div>
    )
}

export default Orders;