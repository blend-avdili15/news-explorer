import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Routes>
          <Route />
          <Route />
        </Routes>
        <Footer />
      </div>
      <LoginModal />
      <RegisterModal />
      <DeleteCardModal />
    </div>
  );
}

export default App;
