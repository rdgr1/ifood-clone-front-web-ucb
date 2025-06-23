// src/components/Sidebar/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  const tipo = localStorage.getItem("tipo");

  const menus: Record<string, { name: string; path: string }[]> = {
    cliente: [
      { name: "Restaurantes", path: "/cliente/restaurantes" },
      { name: "Pedidos", path: "/cliente/pedidos" },
    ],
    loja: [
      { name: "Meus Produtos", path: "/loja/produtos" },
      { name: "Pedidos Recebidos", path: "/loja/pedidos" },
    ],
    entregador: [
      { name: "Pedidos Disponíveis", path: "/entregador/pedidos" },
      { name: "Histórico", path: "/entregador/historico" },
    ],
  };

  return (
    <aside className="sidebar">
      <img src="/src/assets/img/logo.png" alt="logo" className="logo" />
      <nav>
        {menus[tipo as string]?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;