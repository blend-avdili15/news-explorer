import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  // const currentUser = useContext(CurrentUserContext);

  // const isLiked = item.likes.some((id) => id === currentUser?._id);

  //   const itemLikeButtonClassName = `card__like-button ${
  //     isLiked ? "card__like-button_active" : ""
  //   }`;

  //   /const handleLike = () => {
  //     if (onCardLike) {
  //       onCardLike(item._id, isLiked);
  //     }
  //   };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__name">Card</h2>
        <button className="card__like-button">Like</button>
      </div>

      <img src="" alt="" className="card__image" />
    </li>

    // <li className="card">
    //   <div className="card__info">
    //     <h2 className="card__name"></h2>
    //     {/* // {currentUser && (
    //       <button
    //         // onClick={handleLike}
    //         // className={itemLikeButtonClassName}
    //         aria-label="Like"
    //       ></button>
    //     )} */}
    //     <button className="item__like-button"></button>
    //   </div>

    //   <img
    //     // onClick={() => onCardClick(item)}
    //     className="card__image"
    //     // src={item.imageUrl}
    //     // alt={item.name}
    //   />
    // </li>
  );
}

export default ItemCard;
