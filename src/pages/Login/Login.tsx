import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Input from "../../components/Input/Input";
import "./Login.scss";
import ButtonPrimary from "../../components/Button-Primary/ButtonPrimary";
import ButtonOutlined from "../../components/Button-Outlined/ButtonOutlined";
import { toast } from 'react-toastify';
import Logo from "../../components/Logo/Logo";

type Props = {};

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, senha });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("tipo", res.data.tipo)
      if(res.status == 200){
        switch(res.data.tipo){
        case "cliente":
          toast.success("Login realizado, Bem vindo Cliente")
          navigate("/cliente")
          break
        case "entregador":
          toast.success("Login realizado, Bem vindo Entregador")
          navigate("/entregador")
          break
        case "loja":
          toast.success("Login realizado, Bem vindo Lojista")
          navigate("/loja")
          break
        default:
          navigate("/")
      }
      }
    } catch (err) {
      toast.error("Erro, ao efetuar login, Tente Novamente!")
    }
  };
  return (
    <div className="login">
      <Logo/>
      <h1>Bem-vindo!</h1>
      <div className="texts">
        <p className="first">Faça login com seu e-mail e </p>
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
