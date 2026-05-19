import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
}

interface Session {
  id: string;
  userName: string;
  email: string;
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>; // Função de Login
  signOut: () => Promise<void>; //Função de Logout
  signUp: (username: string, email: string, password: string) => Promise<void>; // Função de Cadastro
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem("@session");
        if (storedSession) {
          setSession(JSON.parse(storedSession));
        }
      } catch {
        console.error("Error checking session");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem("@users");
      const currentSession: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const user = currentSession.find(
        (item) => item.email === email && item.password === password,
      );

      if (user) {
        const userSession = {
          id: user.id,
          userName: user.userName,
          email: user.email,
        };
        await AsyncStorage.setItem("@session", JSON.stringify(userSession));
        setSession(userSession);
      } else {
        alert("Credenciais inválidas");
      }
    } catch {
      alert("Login falhou");
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@session");
      setSession(null);
    } catch {
      alert("Logout falhou");
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9), // Gerar ID aleatório
        userName: username,
        email,
        password,
      };

      const users = await AsyncStorage.getItem("@users");
      const currentUsers = users ? JSON.parse(users) : [];
      currentUsers.push(newUser);

      await AsyncStorage.setItem("@users", JSON.stringify(currentUsers));
      await AsyncStorage.setItem("@session", JSON.stringify(newUser));
      setSession({
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
      });
    } catch {
      alert("Registro falhou: ");
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, isLoading, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
