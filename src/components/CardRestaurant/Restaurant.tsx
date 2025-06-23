import { useEffect, useState } from "react";
import api from "../../services/api";
import CardRestaurante from "./CardRestaurant";
import { Typography } from "@mui/material";
import ModalRestaurant from "./ModalRestaurant";
import './Restaurant.scss';
interface Restaurante {
  id: number;
  nome: string;
  descricao: string;
  imagem?: string;
}

const getImagem = (nome: string) => {
  if (nome.includes("Pizzaria")) return "/img/pizzaria.jpg";
  if (nome.includes("Burguer")) return "/img/hamburguer.jpg";
  if (nome.includes("Sushi")) return "/img/sushi.jpg";
  if (nome.includes("Arabe")) return "/img/falafel.jpg";
  return "/img/hamburguer.png";
};

const Restaurantes = () => {
  const [selected, setSelected] = useState<Restaurante | null>(null);
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/restaurant", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRestaurantes(res.data);
      } catch (error) {
        console.error("Erro ao buscar restaurantes:", error);
      }
    };

    fetchRestaurantes();
  }, []);

  return (
    <div className="restaurantes-page">
      <Typography variant="h5">Restaurantes</Typography>
      <div className="grid-restaurantes">
        {restaurantes.map((r, index) => (
          <CardRestaurante
            key={index}
            nome={r.nome}
            descricao={r.descricao}
            imagem={getImagem(r.nome)}
            onClick={() => setSelected(r)}
          />
        ))}
      </div>

      {selected && (
        <ModalRestaurant
          open={true}
          restaurante={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default Restaurantes;
