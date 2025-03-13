import "./ItemCard.css";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";

function ItemCard({
  handleDeleteClick,
  handleSaveClick = () => {},
  saved,
  article,
}) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/savednews";
  const [isBookmarked, setIsBookmarked] = useState(saved); // ✅ Uses "saved" prop to track state

  useEffect(() => {
    setIsBookmarked(saved); // ✅ Update state when props change
  }, [saved]);

  const handleBookmarkClick = () => {
    if (!handleSaveClick) {
      console.error("handleSaveClick is undefined for article:", article);
      return;
    }

    if (isBookmarked) {
      handleDeleteClick(article);
    } else {
      handleSaveClick(article);
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={
          article.urlToImage
            ? article.urlToImage
            : "https://picsum.photos/200/300"
        }
        alt={article.title}
      />

      {isSavedNewsPage && (
        <p className="card__category">{article.keyword || "General"}</p>
      )}

      {isSavedNewsPage ? (
        <button
          onClick={() => handleDeleteClick(article)}
          className="card__delete-button"
          aria-label="Delete article"
        />
      ) : (
        <button
          onClick={handleBookmarkClick}
          className={`card__bookmark ${
            isBookmarked ? "card__bookmark_active" : ""
          }`}
          aria-label="Save article"
        />
      )}

      <div className="card__content">
        <p className="card__date">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <h2 className="card__title">{article.title}</h2>
        <p className="card__description">{article.description}</p>
        <p className="card__reference">
          {article.source?.name || "Unknown Source"}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card__link"
        >
          Read More
        </a>
      </div>
    </li>
  );
}

export default ItemCard;
