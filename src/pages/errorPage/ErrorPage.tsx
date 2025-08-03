import { Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>Error 404</h1>
      <p>Je nám líto, ale stránka kterou hledáte, neexistuje.</p>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="shoppinglist-submit error-button">
          Hlavní stránka
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;