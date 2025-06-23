import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
} from "@mui/material";
import "./ClientePedidos.scss";

interface Pedido {
  id: number;
  status: string;
  data_pedido: string;
  restaurant: { nome: string };
  orderItems: {
    quantidade: number;
    product: { nome: string; preco: number };
  }[];
}

const ClientePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        const res = await api.get(`/order/cliente/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPedidos(res.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <Box className="cliente-pedidos-container">
      <Typography variant="h4" gutterBottom>
        Histórico de Pedidos
      </Typography>

      {pedidos.map((pedido) => (
        <Card key={pedido.id} className="pedido-card">
          <CardContent>
            <Typography variant="h6">
              {pedido?.restaurant?.nome ?? "Restaurante não informado"}
            </Typography>
            <Typography variant="body2">Status: {pedido.status}</Typography>
            <Typography variant="body2">
              Data: {new Date(pedido.data_pedido).toLocaleString()}
            </Typography>
            <List>
              {pedido.orderItems.map((item, index) => (
                <ListItem key={index} disableGutters>
                  {item.quantidade}x {item.product.nome} — R${" "}
                  {(item.product.preco * item.quantidade).toFixed(2)}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ClientePedidos;