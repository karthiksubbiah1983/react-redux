import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";
import UserInterest from "./pages/contact/userInterest";
import Summary from "./pages/contact/summary";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/contact/interest/summary" element={<Summary />} />
            <Route path="/contact/interest" element={<UserInterest />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
