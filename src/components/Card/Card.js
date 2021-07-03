import React from "react";
import styles from "./Card.module.scss";

function Card(props) {
  const [isAdded, setIsAdded] = React.useState(false);

  const onPlusClick = () => {
    setIsAdded(!isAdded);
  };

  console.log(isAdded);

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={props.onFavoriteClick}>
        <img src="./img/unliked.svg" alt="" />
      </div>
      <img width={133} height={112} src={props.image} alt="" />
      <h5>{props.name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена: </span>
          <b>{props.price}</b>
        </div>
        <img
          className={styles.plus}
          onClick={onPlusClick}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
