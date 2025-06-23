import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import "./Privado.scss";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import BotaoCarrinho from "../components/Button-Cart/BotaoCarrinho";
const drawerWidth = 240;

export default function PrivadoLayout() {
  const tipo = localStorage.getItem("tipo");
  const navigate = useNavigate();

  const menus = {
    cliente: [
      {
        label: "Restaurantes",
        path: "/cliente/restaurantes",
        icon: <RestaurantIcon />,
      },
      {
        label: "Meus Pedidos",
        path: "/cliente/pedidos",
        icon: <HistoryIcon />,
      },
    ],
    loja: [
      { label: "Loja", path: "/loja/criar", icon: <AddIcon /> },
      { label: "Produtos", path: "/loja/produtos", icon: <StoreIcon /> },
      { label: "Pedidos", path: "/loja/pedidos", icon: <ShoppingCartIcon /> },
    ],
    entregador: [
      {
        label: "Pedidos para Entregar",
        path: "/entregador/pedidos",
        icon: <DeliveryDiningIcon />,
      },
      {
        label: "Histórico de Entregas",
        path: "/entregador/historico",
        icon: <HistoryIcon />,
      },
    ],
  };

  const userMenus = menus[tipo as keyof typeof menus] || [];

  return (
    <Box>
      <CssBaseline />
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "var(--orange)",
          gap: 5,
        }}
      >
        <Toolbar>
          <img
            src="/src/assets/img/logo.png"
            alt="Logo"
            className="logo-appbar"
            style={{
              height: "75px",
              marginRight: "20px",
              paddingBottom: "10px",
            }}
          />
          <Typography
            className="typography-custom"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Área - {tipo?.toLocaleUpperCase()}
          </Typography>
          {localStorage.getItem("tipo") === "cliente" && (
            <BotaoCarrinho
            />
          )}

          <LogoutIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        className="drawer-custom"
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List style={{ paddingTop: "30px" }}>
          {userMenus.map(({ label, path, icon }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton onClick={() => navigate(path)}>
                <ListItemIcon
                  sx={{
                    color: "var(--orange-secondary)",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: "var(--orange)",
                  }}
                  primary={label}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
