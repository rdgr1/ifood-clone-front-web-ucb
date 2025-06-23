import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useCart } from "../../context/CardContext";
import "./ModalRestaurant.scss";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  restaurante?: {
    id: number;
    nome: string;
    descricao: string;
  } | null;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  id_restaurante: number;
}

const ModalRestaurant: React.FC<ModalProps> = ({ open, onClose, restaurante }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { adicionarProduto } = useCart();
  useEffect(() => {
    if (open && restaurante?.id) {
      api
        .get(`/product?restaurantId=${restaurante.id}`)
        .then((res) => {
          const produtosFormatados = res.data.map((p: Produto) => ({
            ...p,
            preco: Number(p.preco),
          }));
          setProdutos(produtosFormatados);
        })
        .catch((err) => console.error("Erro ao carregar produtos:", err));
    }
  }, [open, restaurante]);

  if (!open || !restaurante) return null;

  return (
<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" className="modal-restaurante">
  <DialogTitle className="modal-title">{restaurante.nome || "Restaurante"}</DialogTitle>
  <DialogContent className="modal-content">
    <Typography variant="subtitle1" className="modal-descricao">
      {restaurante.descricao || "Sem descrição disponível."}
    </Typography>
    <List className="modal-produtos">
      {produtos.length > 0 ? (
        produtos.map((p) => (
          <ListItem key={p.id} divider className="produto-item">
            <ListItemText
              primary={p.nome}
              secondary={`R$ ${Number(p.preco).toFixed(2)}`}
              className="produto-info"
            />
            <Button variant="outlined" size="small" onClick={() => adicionarProduto(p)} className="btn-add">
              Adicionar
            </Button>
          </ListItem>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          Nenhum produto disponível.
        </Typography>
      )}
    </List>
  </DialogContent>
</Dialog>
  );
};

export default ModalRestaurant;