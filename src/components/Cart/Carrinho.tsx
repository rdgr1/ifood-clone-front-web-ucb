import { useCart } from "../../context/CardContext";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../services/api";
import "./Carrinho.scss";
const Carrinho = () => {
  const { cart, removerProduto, limparCarrinho } = useCart();
  const simularCompra = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = Number(localStorage.getItem("id"));
      const addressId = 1; 
      const paymentId = 1; 

      const items = cart.map((p) => ({
        productId: p.id,
        quantity: p.quantidade,
      }));

      await api.post(
        "/order",
        {
          userId,
          addressId,
          items,
          paymentId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Compra simulada com sucesso!");
      limparCarrinho();
    } catch (err) {
      console.error("Erro ao simular compra", err);
      alert("Erro ao finalizar compra.");
    }
  };
  const total = cart.reduce((acc, p) => acc + p.preco * p.quantidade, 0);

  return (
    <div className="carrinho-container">
      <Typography variant="h5" gutterBottom className="carrinho-titulo">
        Carrinho
      </Typography>
      <List className="carrinho-lista">
        {cart.map((p) => (
          <ListItem key={p.id} className="carrinho-item">
            <ListItemText
              primary={`${p.nome} x${p.quantidade}`}
              secondary={`R$ ${(p.preco * p.quantidade).toFixed(2)}`}
              className="produto-info"
            />
            <IconButton
              onClick={() => removerProduto(p.id)}
              className="btn-remove"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" className="carrinho-total">
        Total: R$ {total.toFixed(2)}
      </Typography>
      <div className="carrinho-botoes">
        <Button onClick={limparCarrinho} variant="outlined">
          Limpar Carrinho
        </Button>
        <Button className="finalizar" onClick={simularCompra} variant="contained" color="primary">
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default Carrinho;
