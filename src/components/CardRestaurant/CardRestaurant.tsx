import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import './CardRestaurant.scss';

type Props = {
  nome: string;
  descricao: string;
  imagem: string;
  onClick?: () => void;
};

const CardRestaurante: React.FC<Props> = ({ nome, descricao, imagem, onClick }) => {
  return (
    <Card className="card-restaurante">
      <CardMedia
        component="img"
        height="140"
        image={imagem}
        alt={nome}
        className="card-imagem"
      />
      <CardContent className="card-conteudo">
        <Typography variant="h6" component="div" className="card-nome">
          {nome}
        </Typography>
        <Typography variant="body2" className="card-descricao">
          {descricao}
        </Typography>
        <Button variant="contained" fullWidth onClick={onClick} className="card-botao">
          Ver Mais
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardRestaurante;