import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import main from "../../images/main.svg";

function ItemCard({ handleDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/savednews";

  console.log("Current Route:", location.pathname);

  return (
    <li className="card">
      <img className="card__image" src={main} />

      {isSavedNewsPage && <p className="card__category">Nature</p>}

      {isSavedNewsPage ? (
        <button
          onClick={handleDeleteClick}
          className="card__delete-button"
        ></button>
      ) : (
        <button className="card__bookmark"></button>
      )}

      <div className="card__content">
        <p className="card__date">November 4, 2020</p>
        <h2 className="card__title">
          Everyone Needs a Special 'Sit Spot' in Nature
        </h2>
        <p className="card__descripition">
          Ever since I read Richard Louv's influential book, "Last Child in the
          Woods," the idea of having a special "sit spot" has stuck with me.
          This advice, which Louv attributes to nature educator Jon Young, is
          for both adults and children to find...
        </p>
        <p className="card__reference">TREEHUGGER</p>
      </div>
    </li>
  );
}

export default ItemCard;
