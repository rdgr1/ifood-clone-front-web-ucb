import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Input from "../../components/Input/Input";
import "./Login.scss";
import ButtonPrimary from "../../components/Button-Primary/ButtonPrimary";
import ButtonOutlined from "../../components/Button-Outlined/ButtonOutlined";
import { toast } from "react-toastify";
import Logo from "../../components/Logo/Logo";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      return toast.warning("Preencha todos os campos.");
    }

    try {
      const res = await api.post("/auth/login", { email, senha });
      console.log("RESPOSTA DO LOGIN", res);
      const { access_token, tipo } = res.data;

      if (res.status === 201 || res.status === 200 && access_token && tipo) {
        localStorage.setItem("token", access_token);
        localStorage.setItem("tipo", tipo);

        toast.success(`Login realizado com sucesso! Bem-vindo ${tipo}.`);

        switch (tipo) {
          case "cliente":
            navigate("/cliente");
            break;
          case "entregador":
            navigate("/entregador");
            break;
          case "loja":
            navigate("/loja");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        toast.error("Erro inesperado ao fazer login.");
      }
    } catch (err) {
      toast.error("Erro ao efetuar login. Verifique suas credenciais.");
      console.error(err);
    }
  };

  return (
    <div className="login">
      <Logo />
      <h1>Bem-vindo!</h1>
      <div className="texts">
        <p className="first">Faça login com seu e-mail e</p>
        <p className="second">senha para acessar a plataforma.</p>
      </div>
      <div className="inputs">
        <Input
          title="Email"
          type="email"
          placeholder="Insira seu melhor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          title="Senha"
          type="password"
          placeholder="Insira a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <ButtonPrimary texto="Login" onClick={handleLogin} />
      <img
        className="wrapper"
        src="/src/assets/svg/wrapper.svg"
        alt="wrapper"
      />
      <ButtonOutlined texto="Cadastro" onClick={() => navigate("/cadastro")} />
    </div>
  );
};

export default Login;