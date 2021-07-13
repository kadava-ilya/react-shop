import React from "react";
import styles from "./Card.module.scss";

function Card({
  id,
  title,
  image,
  price,
  onFavorite,
  onPlusClick,
  cartAdded = false,
  favorited = false,
}) {
  const [isAdded, setIsAdded] = React.useState(cartAdded);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onPlusClicked = () => {
    console.log("Добавили в корзину");
    onPlusClick({ title, image, price });
    setIsAdded(!isAdded);
  };

  const onFavoriteClicked = () => {
    console.log("Добавили в закладки");
    onFavorite({ id, title, image, price });
    setIsFavorite(!isFavorite);
  };

  React.useEffect(() => {
    // console.log("Переменная isAdded изменилась");
  }, [isAdded]);

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavoriteClicked}>
        <img
          src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
          alt="Favorite"
        />
      </div>
      <img width={133} height={112} src={image} alt="" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена: </span>
          <b>{price} грн.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onPlusClicked}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
