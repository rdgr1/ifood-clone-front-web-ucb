import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cadastro from "./pages/Cadastro/Cadastro";
import Login from "./pages/Login/Login";
import PrivadoLayout from "./layouts/Privado";
import Restaurantes from "./components/CardRestaurant/Restaurant";
import Carrinho from "./components/Cart/Carrinho";
import ClientePedidos from "./pages/Cliente/ClientePedido";
import CriarLoja from "./pages/Loja/CriaLoja";
import PedidosLoja from "./pages/Loja/PedidosLoja";
import PedidosEntregador from "./pages/Entregador/PedidosEntregador";
import HistoricoEntregador from "./pages/Entregador/HistoricoEntregador";
import ProdutosLoja from "./pages/Loja/ProdutosLoja";



const RequireAuth = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const RedirectIfAuth = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : <>{children}</>;
};

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/cadastro"
          element={
            <RedirectIfAuth>
              <Cadastro />
            </RedirectIfAuth>
          }
        />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Navigate to="/cliente/restaurantes" />} />

          <Route path="/cliente" element={<PrivadoLayout />}>
            <Route path="restaurantes" element={<Restaurantes />} />
            <Route path="pedidos" element={<ClientePedidos />} />
            <Route path="carrinho" element={<Carrinho />} />
          </Route>

          <Route path="/loja" element={<PrivadoLayout />}>
            <Route path="criar" element={<CriarLoja/>}/>
            <Route path="produtos" element={<ProdutosLoja />} />
            <Route path="pedidos" element={<PedidosLoja />} />
          </Route>

          <Route path="/entregador" element={<PrivadoLayout />}>
            <Route path="pedidos" element={<PedidosEntregador />} />
            <Route path="historico" element={<HistoricoEntregador />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
