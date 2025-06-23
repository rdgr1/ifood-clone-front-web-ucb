import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CardContext";
import { useNavigate } from "react-router-dom";

const BotaoCarrinho = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const totalItens = cart.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <IconButton color="inherit" onClick={() => navigate("/cliente/carrinho")}>
      <Badge badgeContent={totalItens} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default BotaoCarrinho;