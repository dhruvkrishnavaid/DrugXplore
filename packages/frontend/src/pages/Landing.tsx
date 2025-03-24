import { Link } from "react-router";

const Landing = () => {
  return (
    <div>
      <h1>Landing</h1>
      <p>Welcome to the landing page!</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Landing;
