import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          Referral System
        </Link>
        <div>
          {user ? (
            <>
              <span style={styles.user}>Hello, {user.username}</span>
              <button onClick={logout} className="btn" style={styles.btn}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn" style={styles.btn}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#343a40",
    color: "#fff",
    padding: "1rem 0",
    marginBottom: "2rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  user: {
    marginRight: "1rem",
  },
  btn: {
    background: "#0056b3",
    padding: "5px 10px",
    fontSize: "14px",
  },
};

export default Navbar;
