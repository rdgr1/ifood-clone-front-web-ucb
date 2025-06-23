import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import "./PedidosLoja.scss"; // Import do SCSS

interface Pedido {
  id: number;
  status: string;
  data_pedido: string;
  orderItems: { nome: string; quantidade: number }[];
}

const PedidosLoja = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const mockPedidos: Pedido[] = [
      {
        id: 1,
        status: "pendente",
        data_pedido: "2025-06-22T20:30:00.000Z",
        orderItems: [
          { nome: "X-Burguer", quantidade: 2 },
          { nome: "Coca 600ml", quantidade: 1 },
        ],
      },
      {
        id: 2,
        status: "entregue",
        data_pedido: "2025-06-21T15:45:00.000Z",
        orderItems: [{ nome: "Pizza Calabresa", quantidade: 1 }],
      },
    ];
    setPedidos(mockPedidos);
  }, []);

  return (
    <Box className="pedidos-container">
      <Typography variant="h4" className="pedidos-titulo">
        Pedidos Recebidos
      </Typography>
      {pedidos.map((p) => (
        <Card key={p.id} className="pedido-card">
          <CardContent>
            <Typography><strong>ID:</strong> {p.id}</Typography>
            <Typography><strong>Status:</strong> {p.status}</Typography>
            <Typography><strong>Data:</strong> {new Date(p.data_pedido).toLocaleString()}</Typography>
            <Typography><strong>Itens:</strong></Typography>
            {p.orderItems.map((item, i) => (
              <Typography key={i} className="pedido-item">
                - {item.nome} x{item.quantidade}
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PedidosLoja;