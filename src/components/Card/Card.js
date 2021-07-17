import React from "react";
import AppContext from "../../context";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

function Card({
  id,
  title,
  image,
  price,
  onFavorite,
  onPlusClick,
  // cartAdded = false,
  favorited = false,
  isLoading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext); // контекст
  // const [isAdded, setIsAdded] = React.useState(cartAdded);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onPlusClicked = () => {
    console.log("Добавили в корзину");
    onPlusClick({ id, title, image, price });
    // setIsAdded(!isAdded);
  };

  const onFavoriteClicked = () => {
    console.log("Добавили в закладки");
    onFavorite({ id, title, image, price });
    setIsFavorite(!isFavorite);
  };

  // React.useEffect(() => {
  //   console.log("Переменная isAdded изменилась");
  // }, [isAdded]);

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={200}
          viewBox="0 0 150 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="152" y="250" rx="0" ry="0" width="0" height="1" />
          <rect x="0" y="125" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="160" rx="5" ry="5" width="80" height="25" />
          <rect x="118" y="155" rx="5" ry="5" width="32" height="32" />
          <rect x="0" y="105" rx="5" ry="5" width="150" height="15" />
        </ContentLoader>
      ) : (
        <>
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
              src={
                isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
              }
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
