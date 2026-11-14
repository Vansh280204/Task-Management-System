import { createContext, useState, useEffect } from "react";
import { getMyProfile } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    const [isLoading, setIsLoading] = useState(
        !!localStorage.getItem("token")
    );
    useEffect(() => {
            const verifyUser = async () => {
                try {
                    const result = await getMyProfile();

                    setUser(result.data);
                    setIsAuthenticated(true);

                } catch (error) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    setToken(null);
                    setUser(null);
                    setIsAuthenticated(false);

                } finally {
                    setIsLoading(false);
                }
            };

            if (localStorage.getItem("token")) {
                verifyUser();
            }
        }, []);
    //Login Function
    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
    };

    //Logout Function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };
  return (
    <AuthContext.Provider value={{token, user, isAuthenticated, login, logout, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;