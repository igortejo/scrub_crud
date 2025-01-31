import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInPage  from "./pages/LogInPage";
import LoginClientPage from "./pages/LoginClientPage";
import LoginManangerPage from "./pages/LoginManangerPage";
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
        <Route path="/" element={<LogInPage />} />
        <Route path="/cliente" element={<LoginClientPage />} />
        <Route path="/gerente" element={<LoginManangerPage />} />
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