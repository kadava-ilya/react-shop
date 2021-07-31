import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://60e2e82a9103bd0017b4763d.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://60e2e82a9103bd0017b4763d.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      // alert("Ошибка при создании заказа :С");
      console.error(error);
    }
    setIsLoading(false);
  };

  const cartItemsArr = items.map((obj) => (
    <div key={obj.id} className="cart-item d-flex align-center mb-20">
      <div
        style={{ backgroundImage: `url(${obj.image})` }}
        className="cartItemImg"
      ></div>
      <div className="mr-20 flex">
        <p className="mb-5">{obj.title}</p>
        <b>{obj.price} грн</b>
      </div>
      <img
        className="remove-btn"
        onClick={() => onRemove(obj.id)}
        src="/img/btn_remove.svg"
        alt="Remove"
      />
    </div>
  ));

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина{" "}
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn_remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">{cartItemsArr}</div>
            <div className="cart-total-block">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} грн</b>
                </li>
                <li>
                  <span>Скидка 5%:</span>
                  <div></div>
                  <b>{(Math.floor((totalPrice / 100) * 5) * 100) / 100} грн</b>
                </li>
                <li>
                  <span>Цена со скидкой:</span>
                  <div></div>
                  <b>{(Math.floor(totalPrice * 0.95) * 100) / 100} грн</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="green_btn"
              >
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            image={
              isOrderCompleted ? "img/complete-order.jpg" : "img/empty-cart.jpg"
            }
            title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы оформить заказ"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
