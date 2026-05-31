import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  // LOAD AUTH DATA
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));

        setToken(storedToken);
      }
    } catch (error) {
      console.error("Auth Load Error:", error);

      localStorage.removeItem("user");

      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  // LOGIN
  const login = (userData, jwtToken) => {
    try {
      setUser(userData);

      setToken(jwtToken);

      localStorage.setItem("user", JSON.stringify(userData));

      localStorage.setItem("token", jwtToken);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);

    setToken(null);

    localStorage.removeItem("user");

    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
