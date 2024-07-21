import { createContext, useContext, useEffect, useState } from "react";
import { register, login, logout } from './../services/authService';
import { storeItem, getItem } from './../services/storageService';

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'token';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null; }>({
    token: null,
    authenticated: null
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await getItem(TOKEN_KEY);
      if (token) {
        setAuthState({ token: token, authenticated: true });
      }
    };
    loadToken();
  }, []);

  const handleRegister = async (email: string, password: string) => {
    const result = await register(email, password);
    return result;
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.token) {
      setAuthState({ token: result.token, authenticated: true });
      await storeItem(TOKEN_KEY, result.token);
    }
    return result;
  };

  const handleLogout = async () => {
    await logout();
    setAuthState({ token: null, authenticated: false });
  };

  const value = {
    authState,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
