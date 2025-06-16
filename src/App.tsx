import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Loja from './pages/Loja/Loja';
import Cadastro from './pages/Cadastro/Cadastro';
import Cliente from './pages/Cliente/Cliente';
import Entregador from './pages/Entregador/Entregador';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/loja" element={<Loja />}/>
      <Route path="/cadastro" element={<Cadastro />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cliente" element={<Cliente/>}/>
      <Route path="/entregador" element={<Entregador/>}/>
    </Routes>
    <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </>
  );
};

export default App;