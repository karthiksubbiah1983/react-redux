import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <>
      <nav className="c-navigation">
        <ul>
          <li>
            <Link to="/contact">Add User</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
