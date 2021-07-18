import React from "react";
import AppContext from "../../context";

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);

  //суммирую из всех объектов в корзине price
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return { cartItems, setCartItems, totalPrice };
};
