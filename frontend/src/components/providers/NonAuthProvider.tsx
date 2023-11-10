import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar";

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
    return (
      <>
        <NavBar />
        {Children}
      </>
    );
  } else {
    {
      navigate("/auth/login");
    }
  }
};

export default LoggedOutUserProvider;
