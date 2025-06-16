import type React from "react";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
      <img
        className="logo"
        src="/src/assets/img/logo.png"
        alt="Logo do App"
      />
    </div>
  );
};

export default Logo;