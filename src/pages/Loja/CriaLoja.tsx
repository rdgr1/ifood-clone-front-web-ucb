import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import api from "../../services/api";
import { toast } from "react-toastify";
import "./CriaLoja.scss";

export default function CriarLoja() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/restaurant",
        { nome, descricao, endereco, telefone, tipo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Loja criada com sucesso!");
      setNome("");
      setDescricao("");
      setEndereco("");
      setTelefone("");
      setTipo("");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar loja");
    }
  };

  return (
    <Box className="criar-loja-container">
      <Typography variant="h5" gutterBottom>
        Criar Loja
      </Typography>

      <TextField
        fullWidth
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        margin="normal"
        placeholder="casual, premium, fast food..."
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="btn-submit"
      >
        Criar Loja
      </Button>
    </Box>
  );
}