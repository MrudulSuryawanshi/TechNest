import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  // console.log("AuthProvider rendered");
  const [authenticated, setAuthenticated] = useState(false);
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
    } finally {
      setLoading(false);
    }

    const userData = await axios.get(
      `${import.meta.env.VITE_API_URL}/users?email=${encodeURIComponent(user.email)}`,
    );

    if (userData.data.length === 0) {
      logOut();
      // setUser(null);
      // setAuthenticated(false);

      throw new Error("User not found.");
    }

    const savedUser = {
      fullname: userData.data[0].fullname,
      email: userData.data[0].email,
      role: userData.data[0].role,
    };

    savedCredential(savedUser);
    // setUser(savedUser);
    // setAuthenticated(true);
  };

  useEffect(() => {
    if (user) {
      me();
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ savedCredential,loading, authenticated, user, logOut, me }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
