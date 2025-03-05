import "./Header.css";

function Header({}) {
  return (
    <header className="header">
      <div className="header__title">NewsExplorer</div>

      <div className="header__container">
        <Link to="/">
          <p className="header__home">Home</p>
        </Link>
        <button className="header__register">Sign in</button>
      </div>
    </header>
  );
}

export default Header;
