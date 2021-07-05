function Drawer(props) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина{" "}
          <img
            onClick={props.onClose}
            className="cu-p"
            src="/img/btn_remove.svg"
            alt="Close"
          />
        </h2>
        <div className="items">
          <div className="cart-item d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(img/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>2 999 грн</b>
            </div>
            <img
              className="remove-btn"
              src="/img/btn_remove.svg"
              alt="Remove"
            />
          </div>
          <div className="cart-item d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(img/sneakers/2.jpg)" }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>2 999 грн</b>
            </div>
            <img
              className="remove-btn"
              src="/img/btn_remove.svg"
              alt="Remove"
            />
          </div>
        </div>
        <div className="cart-total-block">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>15 999 грн</b>
            </li>
            <li>
              <span>Скидка 10%:</span>
              <div></div>
              <b>14 500 грн</b>
            </li>
          </ul>
          <button className="green_btn">
            Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
