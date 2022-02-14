import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Organizations: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return <div>Redirection...</div>;
};
export default Organizations;
