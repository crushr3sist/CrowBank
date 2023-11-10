import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthProvider = ({ ProtectedPage }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canRender, allowRender] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/auth/login");
      allowRender(false);
    } else if (location.pathname === "/" && token === null) {
      navigate("/auth/login");
      allowRender(false);
    } else {
      allowRender(true);
    }
  }, [location]);

  if (canRender) {
    return <>{ProtectedPage}</>;
  } else {
    // You don't need to navigate here, just return null or any other component you want to render
    return null;
  }
};

export default AuthProvider;
