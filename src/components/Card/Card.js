import React from "react";
import styles from "./Card.module.scss";

function Card({ title, image, price, onFavoriteClick, onPlusClick }) {
  const [isAdded, setIsAdded] = React.useState(false);

  const onPlusClicked = () => {
    onPlusClick({ title, image, price });
    setIsAdded(!isAdded);
  };

  React.useEffect(() => {
    console.log("Переменная isAdded изменилась");
  }, [isAdded]);

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavoriteClick}>
        <img src="./img/unliked.svg" alt="" />
      </div>
      <img width={133} height={112} src={image} alt="" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена: </span>
          <b>{price}</b>
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
