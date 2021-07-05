function Drawer({ onClose, onRemove, items = [] }) {
  const cartItemsArr = items.map((obj) => (
    <div className="cart-item d-flex align-center mb-20">
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
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина{" "}
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn_remove.svg"
            alt="Close"
          />
        </h2>


        {items.length > 0 ?
          <div>
            <div className="items">{cartItemsArr}</div>
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
          :
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" src="img/empty-cart.jpg" width={120} height={120} alt="" />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
            <button onClick={onClose} className="greenBtn">
              <img src="/img/arrow3.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>}






      </div>
    </div>
  );
}

export default Drawer;
