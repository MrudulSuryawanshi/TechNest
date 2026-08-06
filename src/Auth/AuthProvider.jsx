import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("user"),
  );
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  );

  const savedCredential = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setAuthenticated(true);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAuthenticated(false);
  };

  const me = async () => {
    try {
      if (!user) {
        setAuthenticated(false);
        return;
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users?email=${encodeURIComponent(user.email)}`,
      );
      

      if (data.length === 0) {
        logOut();
        return;
      }

      const dbUser = data[0];

      if (
        user.id !== dbUser.id ||
        user.fullname !== dbUser.fullname ||
        user.email !== dbUser.email ||
        user.role !== dbUser.role
      ) {
        savedCredential({
          id: dbUser.id,
          fullname: dbUser.fullname,
          email: dbUser.email,
          role: dbUser.role,
        });
      }
    } catch (error) {
      console.error(error);
      logOut();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      me();
    } else {
      setLoading(false);
    }
  }, []);



  return (
    <AuthContext.Provider
      value={{ savedCredential, loading, authenticated, user, logOut, me }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
