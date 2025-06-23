import { Navigate } from "react-router-dom";

const RedirectIfAuth = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : <>{children}</>;
};

export default RedirectIfAuth;