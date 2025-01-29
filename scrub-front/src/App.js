import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import GlobalStyle from "./styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h2>Bem vindo ao sistema CRUD da loja ScrubUP</h2>} />
        <Route path="/usuario" element={<UserPage />} />
        <Route path="/produto" element={<ProductPage />} />
        <Route path="/pedido" element={<OrderPage />} />
      </Routes>
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </Router>
  );
}

export default App;