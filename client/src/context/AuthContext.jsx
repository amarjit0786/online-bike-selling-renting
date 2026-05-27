import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );



  // LOAD USER
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);



  // LOGIN
  const login = (userData, jwtToken) => {

    setUser(userData);

    setToken(jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));

    localStorage.setItem("token", jwtToken);
  };



  // LOGOUT
  const logout = () => {

    setUser(null);

    setToken(null);

    localStorage.removeItem("user");

    localStorage.removeItem("token");
  };



  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;