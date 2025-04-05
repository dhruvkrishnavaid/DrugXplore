import { useEffect } from "react";
import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signup");
  });
  return <></>;
};

export default Landing;
