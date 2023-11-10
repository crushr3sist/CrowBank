import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoggedOutUserProvider = ({ Children }: any) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setIsAuthenticated(true);
      navigate("/");
    } else if (token === null) {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <>{Children}</>;
  } else {
    {
      navigate("/auth/login");
    }
  }
};

export default LoggedOutUserProvider;
