import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import "./PedidosEntregador.scss"; // importa o SCSS

interface Pedido {
  id: number;
  cliente: string;
  endereco: string;
  status: string;
}

const PedidosEntregador = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const mock = [
      {
        id: 1,
        cliente: "Nathan Gonçalves",
        endereco: "Rua das Falafels, 123",
        status: "pendente",
      },
      {
        id: 2,
        cliente: "Rod Vidal",
        endereco: "Av. das Pizzas, 456",
        status: "pronto",
      },
    ];
    setPedidos(mock);
  }, []);

  return (
    <Box className="entregador-pedidos-container">
      <Typography variant="h4" className="entregador-titulo">
        Pedidos Disponíveis
      </Typography>
      {pedidos.map((p) => (
        <Card key={p.id} className="pedido-card">
          <CardContent>
            <Typography className="pedido-id">
              <strong>Pedido #{p.id}</strong>
            </Typography>
            <Typography>Cliente: {p.cliente}</Typography>
            <Typography>Endereço: {p.endereco}</Typography>
            <Typography>Status: {p.status}</Typography>
            <Button variant="contained" className="btn-aceitar">
              Aceitar Entrega
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PedidosEntregador;