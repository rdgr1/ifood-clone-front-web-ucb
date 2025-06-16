import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import ButtonPrimary from '../../components/Button-Primary/ButtonPrimary';
import api from '../../services/api';
import './Cadastro.scss';
import Logo from '../../components/Logo/Logo';
import { toast } from 'react-toastify';

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('cliente');
  const navigate = useNavigate();

  const handleSubmit = async () => {
  if (!nome || !email || !senha || !tipo) {
    return toast.warning("Preencha todos os campos.");
  }

  try {
    const res = await api.post('/auth/register', {
      email,
      nome,
      senha,
      tipo
    });

    const token = res.data?.access_token;
    if ((res.status === 201 || res.status === 200) && token) {
      console.log("SUCESSO",res);
      localStorage.setItem('token', token);
      toast.success("Sua conta foi criada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error("Erro inesperado ao cadastrar.");
    }
  } catch (err: any) {
    const msg = err.response?.data?.message;

    if (err.response?.status === 400 && msg === 'Usuário já existe') {
      toast.error("Usuário já cadastrado.");
    } else if (Array.isArray(msg)) {
      toast.error("Dados inválidos: " + msg.join(", "));
    } else {
      toast.error("Erro ao cadastrar. Tente novamente.");
    }
    console.error(err);
  }
};

  return (
    <div className="Cadastro">
      <Logo/>
      <h1>Cadastro</h1>
      <div className="texts">
        <p className="first">Cadastre-se e aproveite o melhor</p>
        <p className="second">que preparamos para você!</p>
      </div>
      <div className="inputs">
        <Input
          type="text"
          title="Nome"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="email"
          title="Email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          title="Senha"
          placeholder="Crie uma senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <div className="tipo">
          <label>Tipo de cadastro:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="loja">Loja</option>
            <option value="entregador">Entregador</option>
          </select>
        </div>
      </div>
      <ButtonPrimary onClick={handleSubmit} texto="Cadastrar" />
    </div>
  );
};

export default Cadastro;