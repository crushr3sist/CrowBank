import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoggedOutUserProvider = ({ Children }: any) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      navigate("/"); // Redirect authenticated users to the main page
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <>{Children}</>;
  } else {
    return null; // Render nothing for authenticated users
  }
};

export default LoggedOutUserProvider;
