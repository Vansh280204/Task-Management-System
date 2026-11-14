import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Dashboard() {
    const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <h1><h1>Welcome, {user?.name}!</h1></h1>
      <p>You are successfully logged in!</p>
      <button onClick={logout}>
        Logout
    </button>
    </div>
  );
}

export default Dashboard;