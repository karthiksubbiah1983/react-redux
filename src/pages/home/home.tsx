import { Outlet } from "react-router-dom";
import Header from "../../common/header/Header";
import "./home.css";

const Home = () => {
  return (
    <main>
      <Header />
      <div className="pages">
        <Outlet />
      </div>
    </main>
  );
};

export default Home;
