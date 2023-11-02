import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ ProtectedPage }: any) => {
  const navigate = useNavigate();
  const [canRender, allowRender] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/auth/login");
      allowRender(false);
    } else {
      allowRender(true);
    }
  });
  if (canRender) {
    return <>{ProtectedPage}</>;
  } else {
    return <>{navigate("/auth/login")}</>;
  }
};

export default AuthProvider;
