// src/components/Navbar/Navbar.tsx
import './Navbar.scss';

const Navbar: React.FC = () => {
  const tipo = localStorage.getItem('tipo') || 'cliente'; // fallback
  const nome = localStorage.getItem('nome') || 'Usuário';

  return (
    <header className="navbar">
      <div className="usuario">
        <img
          className="foto"
          src="/src/assets/img/perfil.png"
          alt="Foto de perfil"
        />
        <div className="info">
          <p>{nome}</p>
          <small>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</small>
        </div>
      </div>
      <button
        className="logout"
        onClick={() => {
          localStorage.clear();
          location.href = '/login';
        }}
      >
        Sair
      </button>
    </header>
  );
};

export default Navbar;