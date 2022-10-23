import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/register" element={user ? <Dashboard /> : <Register />}/>
          <Route path="/login" element={user ? <Dashboard /> : <Login />} />
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
