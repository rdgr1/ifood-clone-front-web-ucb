import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import "./HistoricoEntregador.scss"; // importa o SCSS

interface Entrega {
  id: number;
  cliente: string;
  endereco: string;
  data: string;
}

const HistoricoEntregador = () => {
  const [historico, setHistorico] = useState<Entrega[]>([]);

  useEffect(() => {
    const mock = [
      {
        id: 101,
        cliente: "João Pedro",
        endereco: "Rua Central, 900",
        data: "2025-06-20T19:00:00.000Z",
      },
      {
        id: 102,
        cliente: "Maria Silva",
        endereco: "Rua das Rosas, 250",
        data: "2025-06-21T13:30:00.000Z",
      },
    ];
    setHistorico(mock);
  }, []);

  return (
    <Box className="entregas-container">
      <Typography variant="h4" className="entregas-titulo">
        Histórico de Entregas
      </Typography>
      {historico.map((e) => (
        <Card key={e.id} className="entrega-card">
          <CardContent>
            <Typography variant="h6">
              <strong>Entrega #{e.id}</strong>
            </Typography>
            <Typography>Cliente: {e.cliente}</Typography>
            <Typography>Endereço: {e.endereco}</Typography>
            <Typography>
              Data: {new Date(e.data).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default HistoricoEntregador;