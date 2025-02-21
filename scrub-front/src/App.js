import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage  from "./pages/HomePage";
import LoginCliente from "./pages/LoginCliente";
import ClienteHomeScreen from "./pages/ClienteHomeScreen"
import LoginGerente from "./pages/LoginGerente";
import GerenteHomeScreen from "./pages/GerenteHomeScreen"
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
        <Route path="/" element={<HomePage />} />
        <Route path="/cliente/login" element={<LoginCliente />} />
        <Route path="/gerente/login" element={<LoginGerente />} />
        <Route path="/cliente/homeScreen" element={<ClienteHomeScreen />} />
        <Route path="/gerente/homeScreen" element={<GerenteHomeScreen />} />
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