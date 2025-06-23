// src/pages/Loja/ProdutosLoja.tsx
import "./ProdutosLoja.scss"; // novo
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import api from "../../services/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Produto {
  id?: number;
  nome: string;
  preco: number;
  categoryId: number;
  restaurantId: number;
}

const ProdutosLoja = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Produto>({
    nome: "",
    preco: 0,
    categoryId: 1,
    restaurantId: Number(localStorage.getItem("restaurantId")),
  });

  const fetchProdutos = async () => {
    if (!form.restaurantId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/product?restaurantId=${form.restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dadosConvertidos = res.data.map((p: any) => ({
        ...p,
        preco: parseFloat(String(p.preco).replace(",", ".")) || 0,
      }));
      setProdutos(dadosConvertidos);
    } catch (err) {
      console.error("Erro ao buscar produtos");
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      if (form.id) {
        await api.put(`/product/${form.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/product", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setModalOpen(false);
      setForm({
        nome: "",
        preco: 0,
        categoryId: 1,
        restaurantId: form.restaurantId,
      });
      fetchProdutos();
    } catch (err) {
      console.error("Erro ao salvar produto", err);
    }
  };

  const handleEdit = (produto: Produto) => {
    setForm(produto);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProdutos();
    } catch (err) {
      console.error("Erro ao deletar produto", err);
    }
  };

  return (
    <Box className="produtos-container">
      <Typography variant="h4" gutterBottom>
        Produtos da Loja
      </Typography>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Adicionar Produto
      </Button>
      <Grid container spacing={2} className="produtos-grid">
        {produtos.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Box className="produto-card">
              <Typography variant="h6">{p.nome}</Typography>
              <Typography variant="body2">
                Preço: R$ {p.preco.toFixed(2)}
              </Typography>
              <Box className="produto-actions">
                <IconButton onClick={() => handleEdit(p)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(p.id!)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
        <DialogTitle>{form.id ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <TextField
            label="Preço"
            type="number"
            fullWidth
            margin="normal"
            value={form.preco}
            onChange={(e) =>
              setForm({ ...form, preco: Number(e.target.value) })
            }
          />
          <TextField
            label="ID da Categoria"
            type="number"
            fullWidth
            margin="normal"
            value={form.categoryId}
            onChange={(e) =>
              setForm({ ...form, categoryId: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProdutosLoja;